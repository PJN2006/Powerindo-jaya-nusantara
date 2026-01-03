'use client'

import { useState } from 'react'
import { X, Maximize2 } from 'lucide-react'

export default function GalleryItem({ item }: { item: any }) {
  const [isFullSize, setIsFullSize] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div 
        className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <img 
          src={item.image_url} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
          alt={item.title} 
        />
        
        {/* Overlay Judul: Muncul jika di-klik (mobile) atau di-hover (desktop) */}
        <div className={`absolute inset-0 bg-brand-dark/80 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <h4 className="font-bold text-xl text-white uppercase tracking-wider mb-2">{item.title}</h4>
          <div className="w-10 h-1 bg-brand-primary mb-6"></div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Stop agar tidak mentrigger setIsActive
              setIsFullSize(true);
            }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white px-5 py-2 rounded-full backdrop-blur-md transition-all text-sm font-bold"
          >
            <Maximize2 size={16} /> FULL SIZE
          </button>
        </div>
      </div>

      {/* Modal Full Size (Lightbox) */}
      {isFullSize && (
        <div 
          className="fixed inset-0 z-999 bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
          onClick={() => setIsFullSize(false)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-all">
            <X size={40} />
          </button>
          <img 
            src={item.image_url} 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300" 
            alt={item.title} 
          />
        </div>
      )}
    </>
  );
}