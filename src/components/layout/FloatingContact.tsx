'use client'

import { useState } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  const csContacts = [
    { name: "Customer Service 1", num: "6281252505111" },
    { name: "Customer Service 2", num: "6282245616400" }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-100 flex flex-col items-end">
      {/* Menu Pilihan CS */}
      <div 
        className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {csContacts.map((cs, i) => (
          <a 
            key={i} 
            href={`https://wa.me/${cs.num}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-brand-dark px-4 py-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 hover:bg-slate-50 transition-colors font-bold text-sm"
          >
            <div className="bg-brand-primary p-1.5 rounded-lg text-white">
              <Phone size={14} />
            </div>
            {cs.name}
          </a>
        ))}
      </div>

      {/* Tombol Utama */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-brand-dark' : 'bg-brand-primary'
        } text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300`}
      >
        {isOpen ? (
          <X size={32} />
        ) : (
          <MessageCircle size={32} fill="currentColor" />
        )}
      </button>
    </div>
  )
}