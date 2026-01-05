// gallery/page.tsx
export const dynamic = 'force-dynamic'
import { supabase } from '@/lib/supabase'
import Reveal from '@/components/layout/Reveal'
import GalleryItem from './GalleryItem'
import FloatingContact from '@/components/layout/FloatingContact'

export default async function GalleryPage() {
  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="bg-white min-h-screen py-24 px-6 relative">
      {/* Lebar container ditingkatkan ke 1400px agar 4 kolom tetap proporsional */}
      <div className="max-w-350 mx-auto">
        <header className="mb-16 text-center">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Visual Portfolio</h2>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark italic uppercase tracking-tighter">
            Our <span className="text-brand-primary">Gallery</span>
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Dokumentasi proyek dan infrastruktur elektrikal yang telah kami kerjakan dengan standar profesional tinggi.
          </p>
        </header>

        {/* Grid disesuaikan: 1 kolom (HP), 2 kolom (Tablet), 4 kolom (Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {galleryItems?.map((item) => (
            <Reveal key={item.id}>
              <GalleryItem item={item} />
            </Reveal>
          ))}
        </div>
      </div>

      <FloatingContact />
    </main>
  );
}