import Reveal from '@/components/layout/Reveal'
import { Award, Target, Users, ShieldCheck, Zap, History } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="text-brand-primary" size={32} />,
      title: "Kualitas Terjamin",
      desc: "Menyediakan produk elektrikal dengan standar internasional demi keamanan dan keandalan jangka panjang."
    },
    {
      icon: <Zap className="text-brand-primary" size={32} />,
      title: "Inovasi Berkelanjutan",
      desc: "Terus mengadopsi teknologi digital terbaru untuk solusi infrastruktur yang lebih efisien."
    },
    {
      icon: <Users className="text-brand-primary" size={32} />,
      title: "Kepuasan Pelanggan",
      desc: "Membangun kemitraan strategis dengan memberikan layanan purna jual dan dukungan teknis terbaik."
    }
  ]

  return (
    <main className="bg-white min-h-screen">
      {/* --- HERO SECTION ABOUT --- */}
      <section className="relative pt-40 pb-24 bg-brand-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <h1 className="text-sm font-bold text-brand-primary uppercase tracking-[0.5em] mb-6">Our Identity</h1>
            <p className="text-5xl md:text-7xl font-black text-white leading-tight italic uppercase tracking-tighter max-w-4xl">
              Powering Progress through <span className="text-brand-primary">Technical Excellence.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- SEJARAH & VISI --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <Reveal>
              <div className="space-y-8">
                <div className="flex items-center gap-4 text-brand-primary">
                  <History size={24} />
                  <span className="font-bold uppercase tracking-widest text-sm">Our Journey</span>
                </div>
                <h2 className="text-4xl font-bold text-brand-dark leading-tight">Membangun Kepercayaan Sejak Awal Berdiri.</h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  <p>
                    PT Powerindo Jaya Nusantara bermula dari visi untuk menstandarisasi kualitas infrastruktur elektrikal di Indonesia. Kami memahami bahwa di balik setiap industri yang maju, terdapat sistem kelistrikan yang kokoh dan aman.
                  </p>
                  <p>
                    Seiring berjalannya waktu, kami berkembang tidak hanya sebagai supplier, tetapi sebagai mitra integrasi digital yang membantu perusahaan mengoptimalkan performa energi mereka melalui teknologi otomasi dan distribusi modern.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-slate-50 p-12 rounded-4xl border border-slate-100 relative overflow-hidden">
                <Target className="absolute -right-10 -bottom-10 text-slate-200 size-64 opacity-50" />
                <div className="relative z-10 space-y-10">
                  <div>
                    <h3 className="text-brand-primary font-black uppercase tracking-widest text-xs mb-4">Visi Kami</h3>
                    <p className="text-2xl font-bold text-brand-dark italic">
                      "Menjadi perusahaan penyedia solusi peralatan listrik terkemuka yang mengutamakan kualitas produk dan keunggulan teknis di setiap karya."
                    </p>
                  </div>
                  <div className="pt-10 border-t border-slate-200">
                    <h3 className="text-brand-primary font-black uppercase tracking-widest text-xs mb-4">Misi Kami</h3>
                    <ul className="space-y-4 text-slate-600 font-medium">
                      <li className="flex gap-3">
                        <span className="text-brand-primary font-black">•</span>
                        Menyediakan produk berkualitas tinggi yang memenuhi standar teknis nasional & internasional.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-primary font-black">•</span>
                        Memberikan solusi ME (Mechanical Electrical) yang inovatif dan tepat guna.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-primary font-black">•</span>
                        Mendukung transformasi digital melalui infrastruktur energi yang cerdas.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-32 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <Reveal>
            <h2 className="text-brand-primary font-bold uppercase tracking-widest mb-4">Core Values</h2>
            <h3 className="text-4xl md:text-5xl font-bold uppercase italic tracking-tighter">Prinsip Utama Kami</h3>
          </Reveal>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v, i) => (
            <Reveal key={i}>
              <div className="p-10 border border-white/10 rounded-3xl hover:border-brand-primary transition-all duration-500 group bg-white/5">
                <div className="mb-8 group-hover:scale-110 transition-transform duration-500">{v.icon}</div>
                <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-32 px-6 bg-white text-center">
        <Reveal>
          <div className="max-w-3xl mx-auto space-y-10">
            <Award className="mx-auto text-brand-primary" size={64} />
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase italic tracking-tighter">
              Ready to work with us?
            </h2>
            <p className="text-slate-500 text-lg">
              Konsultasikan kebutuhan infrastruktur elektrikal dan digital proyek Anda bersama tim ahli kami.
            </p>
            <div className="flex justify-center gap-6">
              <a href="/contact" className="px-10 py-5 bg-brand-primary text-white font-bold rounded-full shadow-2xl hover:bg-blue-700 transition-all">
                HUBUNGI KAMI
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}