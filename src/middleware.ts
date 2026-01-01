import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // LOGIKA COOKIE LAMA ANDA (YANG STABIL)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // --- LOGIKA PROTEKSI TANPA LOOP ---

  // 1. Jika BELUM login & mencoba akses area dashboard/admin
  const isProtectedPath = path.startsWith('/dashboard') || path.startsWith('/admin');
  if (!user && isProtectedPath) {
    // Pastikan tidak me-redirect jika memang sudah berada di /login
    if (path !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 2. Jika SUDAH login & mencoba buka /login, lempar ke /dashboard
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}