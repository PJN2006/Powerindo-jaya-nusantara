import Link from 'next/link';
import { ArrowRight, BarChart3, Globe, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Solusi Teknologi Masa Depan untuk <span className="text-brand-primary">Visitec</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Membangun infrastruktur digital yang kokoh dengan standar kualitas internasional. Kami menghadirkan inovasi tanpa batas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/blog" className="px-8 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                Lihat Insights <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-4 border border-slate-500 text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                Tentang Kami
              </button>
            </div>
          </div>
        </div>
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-primary/20 to-transparent opacity-50" />
      </section>

      {/* Stats / Features Sederhana */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Global Network</h3>
              <p className="text-slate-500">Terhubung dengan mitra strategis di seluruh dunia.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Trusted Quality</h3>
              <p className="text-slate-500">Sertifikasi standar mutu tinggi di setiap proyek.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Data Driven</h3>
              <p className="text-slate-500">Keputusan strategis berdasarkan analisis data akurat.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}