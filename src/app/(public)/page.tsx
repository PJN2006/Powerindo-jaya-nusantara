// 1. Tambahkan baris ini agar data selalu diperbarui (tidak tersangkut cache)
export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase' // Pastikan path lib ini benar
import HeroSlider from '@/components/layout/HeroSlider'
import Reveal from '@/components/layout/Reveal'

export default async function HomePage() {
  // 2. Fetch data Gallery dari tabel 'gallery' yang Anda buat di SQL
  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6); // Mengambil 6 foto terbaru

  return (
    <main className="bg-white">
      <HeroSlider />

      {/* Poin 3: About Overview (Logika asli tetap sama) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-8">
                  About Visitec
                </h2>
                <p className="text-4xl md:text-6xl font-light text-brand-dark leading-[1.1]">
                  Leading the way in <span className="font-bold">Digital Transformation</span> and Infrastructure.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-slate-600 leading-relaxed">
                  Kami bukan sekadar penyedia layanan teknologi. Visitec adalah mitra strategis yang membantu perusahaan besar mengintegrasikan solusi digital paling mutakhir.
                </p>
                <div className="pt-6">
                  <button className="text-brand-dark font-bold border-b-2 border-brand-primary pb-2 hover:text-brand-primary transition-all">
                    OUR HISTORY →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Business Units Section (Logika asli tetap sama) */}
      <section className="bg-slate-50 py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
                  Integrated Solutions for High-Scale Enterprise.
                </h3>
              </div>
              <button className="px-8 py-4 border-2 border-brand-dark text-brand-dark font-bold rounded-full hover:bg-brand-dark hover:text-white transition-all">
                VIEW ALL SERVICES
              </button>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Digital Infrastructure', icon: '01' },
              { title: 'Cyber Security', icon: '02' },
              { title: 'Cloud Integration', icon: '03' }
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="group relative bg-white p-12 rounded-4xl border border-slate-200 transition-all duration-500 hover:-translate-y-4">
                  <div className="absolute inset-0 bg-brand-dark scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-4xl z-0" />
                  <div className="relative z-10">
                    <div className="text-4xl font-black text-slate-100 group-hover:text-white/10 transition-colors mb-8">
                      {item.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-brand-dark group-hover:text-white mb-4 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed">
                      Kami menyediakan fondasi teknologi yang aman dan terukur untuk mendukung operasional bisnis Anda 24/7.
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - SEKARANG DYNAMIC MENGGUNAKAN DATA SUPABASE */}
      <section className="py-32 px-6 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Gallery</h2>
            <h3 className="text-4xl font-bold italic uppercase tracking-tighter">Our Work In Action</h3>
          </div>
          
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {/* 3. Mapping data dari database Supabase */}
            {galleryItems && galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <Reveal key={item.id}>
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10">
                    <img 
                      src={item.image_url} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                      alt={item.title || "Visitec Project"} 
                    />
                    {/* Overlay judul saat hover */}
                    <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                       <p className="font-bold text-lg uppercase tracking-widest">{item.title}</p>
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              // Tampilan fallback jika data kosong
              <p className="text-slate-500 italic">No gallery items uploaded yet.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}