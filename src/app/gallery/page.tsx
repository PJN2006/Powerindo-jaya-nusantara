export const dynamic = 'force-dynamic'
import { supabase } from '@/lib/supabase'
import Reveal from '@/components/layout/Reveal'
import { MessageCircle, Phone } from 'lucide-react'

export default async function GalleryPage() {
  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="bg-white min-h-screen py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4 text-center">Visual Portfolio</h2>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark italic text-center uppercase tracking-tighter">
            Our <span className="text-brand-primary">Gallery</span>
          </h1>
        </header>

        {/* Grid Layout: Berbeda dari slider home */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems?.map((item) => (
            <Reveal key={item.id}>
              <div className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                <img 
                  src={item.image_url} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.title} 
                />
                <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center">
                   <h4 className="font-bold text-xl text-white uppercase tracking-wider mb-2">{item.title}</h4>
                   <div className="w-10 h-1 bg-brand-primary"></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Floating WA Button (Konsisten) */}
      <div className="fixed bottom-8 right-8 z-100 flex flex-col items-end group">
        <div className="flex flex-col gap-3 mb-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
          <a href="https://wa.me/6281252505111" target="_blank" className="bg-white text-brand-dark px-4 py-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 font-bold text-sm"><Phone size={14} className="text-green-500" /> CS 1</a>
          <a href="https://wa.me/6282245616400" target="_blank" className="bg-white text-brand-dark px-4 py-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 font-bold text-sm"><Phone size={14} className="text-green-500" /> CS 2</a>
        </div>
        <button className="bg-green-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all"><MessageCircle size={32} fill="currentColor" /></button>
      </div>
    </main>
  );
}