import Reveal from '@/components/layout/Reveal';

export default function LegalPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-32 px-6 text-slate-600">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-4xl shadow-sm border border-slate-100">
        <Reveal>
          <h1 className="text-4xl font-black text-brand-dark mb-10 italic uppercase tracking-tighter">Privacy Policy & Terms</h1>
          
          <section className="mb-12">
            <h2 className="text-xl font-bold text-brand-dark mb-4 uppercase tracking-widest">1. Kebijakan Privasi</h2>
            <p className="leading-relaxed mb-4">
              PT Powerindo Jaya Nusantara berkomitmen untuk melindungi privasi setiap pengunjung website kami. Informasi yang Anda berikan melalui formulir kontak atau WhatsApp hanya akan digunakan untuk kepentingan komunikasi bisnis, konsultasi proyek, dan layanan pelanggan. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan tertulis.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-brand-dark mb-4 uppercase tracking-widest">2. Syarat & Ketentuan</h2>
            <p className="leading-relaxed mb-4">
              Seluruh konten, gambar, logo, dan informasi teknis produk yang ditampilkan dalam website ini adalah milik intelektual PT Powerindo Jaya Nusantara. Penggunaan konten tanpa izin tertulis dari pihak manajemen dilarang keras. 
            </p>
            <p className="leading-relaxed mb-4">
              Harga produk yang tertera adalah estimasi dan dapat berubah sewaktu-waktu sesuai dengan fluktuasi pasar dan kebijakan perusahaan. Untuk penawaran resmi (Quotation), silakan hubungi tim sales kami melalui jalur komunikasi yang tersedia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4 uppercase tracking-widest">3. Kontak Hukum</h2>
            <p className="leading-relaxed">
              Jika Anda memiliki pertanyaan lebih lanjut mengenai kebijakan hukum atau ingin mengajukan kerja sama resmi, silakan hubungi kami melalui email di: <span className="font-bold text-brand-primary underline">powerindo1230@gmail.com</span>
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}