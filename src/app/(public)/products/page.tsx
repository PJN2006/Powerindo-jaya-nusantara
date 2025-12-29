// 1. Tetap memaksa data selalu diperbarui
export const dynamic = 'force-dynamic'

// Sesuaikan import ke file yang benar
import { supabase } from '@/lib/supabase' 
import Reveal from '@/components/layout/Reveal'
import { MessageCircle, Phone } from 'lucide-react' // Import ikon tambahan

// Definisikan tipe data agar tidak error 'implicitly any'
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <section className="py-32 px-6 bg-white min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-16 text-brand-dark italic">OUR PRODUCTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products?.map((item: Product) => ( 
            <Reveal key={item.id}>
              <div className="group border border-slate-100 rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition-all">
                <div className="h-72 overflow-hidden">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-brand-dark">{item.name}</h3>
                  <p className="text-slate-500 mb-6 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-brand-primary">
                      Rp {item.price?.toLocaleString('id-ID')}
                    </span>
                    <button className="text-sm font-bold border-b-2 border-brand-dark">DETAILS</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <div className="fixed bottom-8 right-8 z-100 flex flex-col items-end group">
        {/* Menu Pilihan WhatsApp yang muncul saat di-hover */}
        <div className="flex flex-col gap-3 mb-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
          <a 
            href="https://wa.me/6281252505111" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-brand-dark px-4 py-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 hover:bg-slate-50 transition-colors font-bold text-sm"
          >
            <div className="bg-green-500 p-1.5 rounded-lg text-white">
              <Phone size={14} />
            </div>
            Customer Service 1
          </a>
          <a 
            href="https://wa.me/6282245616400" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-brand-dark px-4 py-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 hover:bg-slate-50 transition-colors font-bold text-sm"
          >
            <div className="bg-green-500 p-1.5 rounded-lg text-white">
              <Phone size={14} />
            </div>
            Customer Service 2
          </a>
        </div>

        {/* Tombol Utama (Icon WhatsApp) */}
        <button className="bg-green-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none">
          <MessageCircle size={32} fill="currentColor" />
        </button>
      </div>
    </section>
  )
}