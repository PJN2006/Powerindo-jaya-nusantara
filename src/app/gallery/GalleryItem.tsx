// gallery/GalleryItem.tsx
'use client'

import { useState } from 'react'
import { X, Maximize2, Info } from 'lucide-react'

export default function GalleryItem({ item }: { item: any }) {
  const [isFullSize, setIsFullSize] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div 
        className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-slate-100"
        onClick={() => setIsActive(!isActive)}
      >
        <img 
          src={item.image_url} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
          alt={item.title} 
        />
        
        {/* Indikator Klik untuk Mobile (Opsional - agar user tahu bisa di klik) */}
        {!isActive && (
          <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full md:hidden backdrop-blur-sm text-brand-dark">
            <Info size={16} />
          </div>
        )}

        {/* Overlay Judul: Muncul jika di-klik (mobile/active) atau di-hover (desktop) */}
        <div className={`absolute inset-0 bg-brand-dark/80 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <h4 className="font-bold text-lg text-white uppercase tracking-wider mb-2 leading-tight px-2">{item.title}</h4>
          <div className="w-8 h-1 bg-brand-primary mb-6"></div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Agar tidak menutup overlay saat ingin zoom
              setIsFullSize(true);
            }}
            className="flex items-center gap-2 bg-brand-primary hover:bg-white hover:text-brand-dark text-white px-5 py-2 rounded-full transition-all text-xs font-black tracking-widest"
          >
            <Maximize2 size={14} /> ZOOM
          </button>
        </div>
      </div>

      {/* Modal Full Size (Lightbox) */}
      {isFullSize && (
        <div 
          className="fixed inset-0 z-100 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setIsFullSize(false)}
        >
          {/* Tombol Close */}
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-all hover:rotate-90 duration-300">
            <X size={40} />
          </button>

          {/* Gambar Full Size */}
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <img 
              src={item.image_url} 
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-500" 
              alt={item.title} 
            />
            
            {/* Judul di Full Size agar User HP tetap bisa baca konteksnya */}
            <div className="mt-8 text-center px-6">
              <h3 className="text-white text-xl md:text-3xl font-black italic uppercase tracking-tighter">{item.title}</h3>
              <p className="text-brand-primary font-bold text-xs md:text-sm tracking-[0.3em] mt-2 uppercase">Project Documentation</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}