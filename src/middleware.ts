import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Update cookie di request dan response agar sesi tetap segar
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // SANGAT PENTING: Gunakan getUser() di middleware untuk keamanan RLS yang stabil
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  // Area yang harus login
  const isProtectedPath = path.startsWith('/admin') || path.startsWith('/dashboard')

  // ❌ Kasus: Belum login tapi mencoba akses area Admin
  if (!user && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ✅ Kasus: Sudah login tapi mencoba buka halaman Login lagi
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return response
}

export const config = {
  // Matcher ini melindungi semua halaman KECUALI aset statis dan API internal Next.js
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}