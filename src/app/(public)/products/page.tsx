// 1. Tetap memaksa data selalu diperbarui
export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase' 
import Reveal from '@/components/layout/Reveal'
import { MessageCircle, Phone, Tag, PackageSearch, Search } from 'lucide-react' 
import Link from 'next/link'
import FloatingContact from '@/components/layout/FloatingContact'

// Definisikan tipe data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.category;
  const searchQuery = searchParams.q;

  const categories = [
    "Trafo", "Cubicle", "ATS+LVMDP", "Capasitor Bank", 
    "Kabel - Tegangan Menengah", "Kabel - Tegangan Rendah", 
    "Genset", "Penangkal Petir", "Busduct", "Hydrant", "AC"
  ];

  let query = supabase.from('products').select('*').order('created_at', { ascending: false });
  if (selectedCategory && selectedCategory.trim() !== "") {
    query = query.eq('category', selectedCategory);
  }
  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike('name', `%${searchQuery}%`);
  }

  const { data: products } = await query;

  return (
    <section className="py-32 px-6 bg-white min-h-screen relative">
      <div className="max-w-400 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
                <h1 className="text-5xl font-black text-brand-dark italic mb-4 uppercase tracking-tighter">OUR PRODUCTS</h1>
                <p className="text-slate-500 max-w-xl">Menyediakan infrastruktur elektrikal dan digital terbaik untuk kebutuhan industri Anda.</p>
            </div>

            <form action="/products" method="GET" className="relative w-full md:w-96 group">
                <input 
                    type="text" 
                    name="q" 
                    defaultValue={searchQuery}
                    placeholder="Cari trafo, kabel, atau genset..." 
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-full outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-brand-dark"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={20} />
                {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
            </form>
        </div>

        <div className="flex flex-wrap gap-2 mb-16">
          <Link 
            href="/products"
            className={`px-6 py-2.5 rounded-full border-2 text-[9px] font-black tracking-widest transition-all duration-300 shadow-sm ${
              !selectedCategory 
              ? 'bg-brand-primary text-white border-brand-primary shadow-blue-200 shadow-lg' 
              : 'bg-white text-slate-400 border-slate-100 hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            SEMUA
          </Link>
          
          {categories.map((cat) => (
            <Link 
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}${searchQuery ? `&q=${searchQuery}` : ''}`}
              className={`px-6 py-2.5 rounded-full border-2 text-[9px] font-black tracking-widest transition-all duration-300 shadow-sm ${
                selectedCategory === cat 
                ? 'bg-brand-primary text-white border-brand-primary shadow-blue-200 shadow-lg' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* --- GRID PRODUK (5 KOLOM) --- */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch">
            {products.map((item: Product) => ( 
              <Reveal key={item.id}>
                <div className="group border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white h-full flex flex-col">
                  <div className="h-52 overflow-hidden relative shrink-0">
                    <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-100">
                        <Tag size={10} className="text-brand-primary" />
                        <span className="text-[9px] font-black text-brand-dark uppercase tracking-wider">{item.category || 'General'}</span>
                    </div>
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-lg font-bold mb-2 text-brand-dark line-clamp-2 leading-tight h-12">{item.name}</h3>
                    
                    <p className="text-slate-500 mb-6 line-clamp-2 text-xs leading-relaxed grow">
                      {item.description}
                    </p>

                    {/* --- RE-ORDERED ACTIONS: Hapus Harga, Tambah Cek Harga --- */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-50 mt-auto">
                      <Link 
                        href={`/products/${item.id}`} 
                        className="text-[9px] font-black tracking-[0.2em] text-center py-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-brand-dark transition-all uppercase"
                      >
                        Details
                      </Link>
                      <a 
                        href={`https://wa.me/6281252505111?text=Halo Powerindo, saya ingin cek harga untuk produk: ${item.name}`}
                        target="_blank"
                        className="text-[10px] font-black tracking-widest text-center py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-dark transition-all uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                      >
                        <MessageCircle size={14} fill="currentColor" /> Cek Harga
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
            <PackageSearch size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-400 font-medium italic">Produk tidak ditemukan.</p>
            <Link href="/products" className="mt-4 text-brand-primary font-bold text-sm hover:underline">Lihat Semua Produk</Link>
          </div>
        )}
      </div>
      <FloatingContact />
    </section>
  )
}