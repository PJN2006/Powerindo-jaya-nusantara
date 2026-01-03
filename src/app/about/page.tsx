'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Reveal from '@/components/layout/Reveal'
import { Award, Target, ShieldCheck, Zap, History, CheckCircle2, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'
import FloatingContact from '@/components/layout/FloatingContact'

export default function AboutPage() {
  const [projects, setProjects] = useState<any[]>([])
  
  // --- LOGIKA PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const projectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function getProjects() {
      const { data } = await supabase
        .from('project_experience')
        .select('*')
        .order('project_no', { ascending: false })
      if (data) setProjects(data)
    }
    getProjects()
  }, [])

  // Hitung data yang tampil
  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll otomatis ke judul "Project Experience" agar UX lebih nyaman
    projectRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const productList = [
    "Transformator Distribusi", "Panel Cubicle", "Instalasi Arrester MV dan LV",
    "Soundproofing Diesel/Genset", "Instalasi Penangkal Petir Eksternal", "Panel AMF - ATS",
    "Main Distribution Panel MDP/SDP", "Panel Kapasitor Bank", "Panel Motor Control Center (MCC)",
    "Panel Change Over Switch", "Panel Kontrol Genset", "Panel Synchron Generator Set",
    "Panel Otomatisasi PLC dan Sistem SCADA", "Instalasi Gas Detector LPG Storage",
    "Kabel Listrik Berbagai Tipe", "Hydrant", "HVAC"
  ]

  return (
    <main className="bg-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 bg-brand-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <h1 className="text-sm font-bold text-brand-primary uppercase tracking-[0.5em] mb-6">Our Identity</h1>
            <p className="text-5xl md:text-7xl font-black text-white leading-tight italic uppercase tracking-tighter max-w-4xl">
              Dedikasi & <span className="text-brand-primary">Solusi Teknik</span> Terbaik Sejak 2006.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- OUR JOURNEY --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <Reveal>
              <div className="space-y-8">
                <div className="flex items-center gap-4 text-brand-primary">
                  <History size={24} />
                  <span className="font-bold uppercase tracking-widest text-sm">Our Journey</span>
                </div>
                <h2 className="text-4xl font-bold text-brand-dark leading-tight">Dari Visitec Kurnia Mandiri Menjadi Powerindo Jaya Nusantara.</h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed text-justify">
                  <p>
                    PT. Powerindo Jaya Nusantara memulai perjalanannya pada tahun <span className="font-bold text-brand-dark text-xl">2006</span> dengan nama <span className="italic">CV. Visitec Kurnia Mandiri</span>. Selama lebih dari satu dekade, kami telah mendedikasikan diri untuk memberikan solusi teknik terbaik bagi berbagai sektor industri di Indonesia.
                  </p>
                  <p>
                    Seiring dengan meningkatnya kepercayaan klien dan kebutuhan akan skala operasional yang lebih besar, pada tahun <span className="font-bold text-brand-dark text-xl">2020</span> kami resmi bertransformasi menjadi <span className="font-bold text-brand-primary">PT. Powerindo Jaya Nusantara</span>. 
                  </p>
                  <p>
                    Kami hadir sebagai mitra terpercaya di bidang Mechanical Electrical, spesialis dalam manufaktur, perakitan, instalasi, serta penyedia jasa engineering peralatan listrik berkualitas tinggi untuk sektor industrial, komersial, maupun infrastruktur.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-slate-50 p-12 rounded-4xl border border-slate-100 relative overflow-hidden h-full flex flex-col justify-center">
                <Target className="absolute -right-10 -bottom-10 text-slate-200 size-64 opacity-50" />
                <div className="relative z-10">
                  <h3 className="text-brand-primary font-black uppercase tracking-widest text-xs mb-6">Visi Kami</h3>
                  <p className="text-3xl font-bold text-brand-dark italic leading-snug">
                    "Menjadi perusahaan penyedia solusi peralatan listrik terkemuka yang mengutamakan kualitas produk dan keunggulan teknis di setiap karya."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS & SERVICES LIST --- */}
      <section className="py-32 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div id="expertise-section" className="text-center mb-20">
              <h2 className="text-brand-primary font-bold uppercase tracking-widest mb-4">Our Expertise</h2>
              <h3 className="text-4xl font-bold text-brand-dark uppercase italic tracking-tighter">Produk & Instalasi</h3>
              <p className="text-slate-500 mt-4">Rangkaian solusi berkualitas tinggi untuk kebutuhan energi industri Anda.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            {productList.map((item, index) => (
              <Reveal key={index}>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group hover:border-brand-primary transition-all">
                  <CheckCircle2 className="text-brand-primary shrink-0" size={20} />
                  <span className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* --- BAGIAN BARU: PROJECT EXPERIENCE LIST DENGAN PAGINATION --- */}
          {projects.length > 0 && (
            <div className="mt-32" ref={projectRef}>
              <Reveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-primary/10 rounded-2xl">
                      <Briefcase className="text-brand-primary" size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-brand-dark uppercase italic tracking-tighter">Project Experience</h3>
                      <p className="text-slate-500">Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, projects.length)} dari {projects.length} proyek.</p>
                    </div>
                  </div>

                  {/* Navigasi Atas (Opsional/Mobile Friendly) */}
                  <div className="flex items-center gap-2">
                     <button 
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="p-2 border rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all"
                     >
                        <ChevronLeft size={20} />
                     </button>
                     <button 
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="p-2 border rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all"
                     >
                        <ChevronRight size={20} />
                     </button>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.3em]">
                        <tr>
                          <th className="px-8 py-6">No</th>
                          <th className="px-8 py-6">Project Name</th>
                          <th className="px-8 py-6">Company / Client</th>
                          <th className="px-8 py-6">Field</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {currentProjects.map((proj) => (
                          <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-5 text-brand-primary font-black">#{proj.project_no}</td>
                            <td className="px-8 py-5 font-bold text-brand-dark text-sm leading-snug">{proj.project_name}</td>
                            <td className="px-8 py-5 text-slate-500 text-sm font-medium">{proj.company}</td>
                            <td className="px-8 py-5">
                              <span className="px-3 py-1 bg-slate-100 text-[9px] font-black uppercase rounded-full text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors border border-transparent group-hover:border-brand-primary/20">
                                {proj.field}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* --- KONTROL PAGINATION UTAMA --- */}
                  <div className="bg-slate-50/50 p-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-6">
                     <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                           <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                                 currentPage === page 
                                 ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 scale-110' 
                                 : 'bg-white text-slate-400 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'
                              }`}
                           >
                              {page}
                           </button>
                        ))}
                     </div>
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-32 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal>
              <div className="space-y-6">
                <ShieldCheck className="text-brand-primary" size={48} />
                <h4 className="text-2xl font-bold italic tracking-tighter uppercase">Kualitas Terjamin</h4>
                <p className="text-slate-400 leading-relaxed">Berorientasi pada kualitas di setiap aspek manufaktur dan jasa engineering kami.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="space-y-6">
                <Zap className="text-brand-primary" size={48} />
                <h4 className="text-2xl font-bold italic tracking-tighter uppercase">Keunggulan Teknis</h4>
                <p className="text-slate-400 leading-relaxed">Didukung oleh tenaga ahli berpengalaman untuk instalasi dan perakitan presisi.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="space-y-6">
                <Award className="text-brand-primary" size={48} />
                <h4 className="text-2xl font-bold italic tracking-tighter uppercase">Mitra Terpercaya</h4>
                <p className="text-slate-400 leading-relaxed">Membangun hubungan jangka panjang melalui keandalan infrastruktur elektrikal.</p>
              </div>
            </Reveal>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-32 px-6 bg-white text-center">
        <Reveal>
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase italic tracking-tighter">
              Ready to work with us?
            </h2>
            <p className="text-slate-500 text-lg">
              Konsultasikan kebutuhan Mechanical Electrical dan infrastruktur proyek Anda bersama PT. Powerindo Jaya Nusantara.
            </p>
            <div className="flex justify-center gap-6">
              <a href="/contact" className="px-10 py-5 bg-brand-primary text-white font-bold rounded-full shadow-2xl hover:bg-blue-700 transition-all uppercase tracking-widest text-sm">
                Hubungi Kami Sekarang
              </a>
            </div>
          </div>
        </Reveal>
      </section>
      <FloatingContact />
    </main>
  )
}