export const dynamic = 'force-dynamic'
import { supabase } from '@/lib/supabase'
import Reveal from '@/components/layout/Reveal'
import { MessageCircle, Phone } from 'lucide-react'
import GalleryItem from './GalleryItem' // Import dari folder yang sama
import FloatingContact from '@/components/layout/FloatingContact'

export default async function GalleryPage() {
  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="bg-white min-h-screen py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Visual Portfolio</h2>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark italic uppercase tracking-tighter">
            Our <span className="text-brand-primary">Gallery</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems?.map((item) => (
            <Reveal key={item.id}>
              {/* Masukkan item ke komponen GalleryItem */}
              <GalleryItem item={item} />
            </Reveal>
          ))}
        </div>
      </div>

      <FloatingContact />
    </main>
  );
}