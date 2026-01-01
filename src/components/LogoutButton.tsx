'use client'

import { useState } from 'react'
import { logoutAction } from '@/app/(auth)/login/action' // Sesuaikan path jika error
import { LogOut, Loader2 } from 'lucide-react'

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      setIsPending(true)
      try {
        await logoutAction()
      } catch (error) {
        console.error('Logout failed', error)
        setIsPending(false)
      }
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-3 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm border border-red-100 disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <LogOut size={18} />
      )}
      <span>{isPending ? 'Keluar...' : 'Logout'}</span>
    </button>
  )
}