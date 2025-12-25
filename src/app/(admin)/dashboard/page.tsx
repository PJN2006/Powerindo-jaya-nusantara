'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  BarChart3, FileText, Eye, Plus, Package, 
  Image as ImageIcon, Loader2, Trash2, LayoutDashboard 
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'insight' | 'products' | 'gallery'>('insight');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [prodForm, setProdForm] = useState({ name: '', desc: '', price: '', file: null as File | null });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data: postsData } = await supabase.from('posts').select('*').order('views', { ascending: false });
    const { data: prodData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (postsData) setPosts(postsData);
    if (prodData) setProducts(prodData);
  }

  // LOGIKA HAPUS (RLS harus aktif di Supabase agar ini berhasil)
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Hapus produk ini dari katalog?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        alert(error.message);
      } else {
        setProducts(products.filter(p => p.id !== id));
        alert("Produk Berhasil Dihapus!");
      }
    }
  };

  const uploadToStorage = async (file: File, folder: string) => {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${fileName}`;
    const { error } = await supabase.storage.from('visitec-assets').upload(filePath, file);
    if (error) throw error;
    return supabase.storage.from('visitec-assets').getPublicUrl(filePath).data.publicUrl;
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.file) return alert('Pilih gambar produk!');
    setLoading(true);
    try {
      const url = await uploadToStorage(prodForm.file, 'products');
      await supabase.from('products').insert([{ 
        name: prodForm.name, description: prodForm.desc, 
        price: parseFloat(prodForm.price), image_url: url 
      }]);
      alert('Produk Berhasil Ditambahkan!');
      setProdForm({ name: '', desc: '', price: '', file: null });
      fetchData();
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-slate-50 min-h-screen">
      {/* HEADER NAVIGASI TABS */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-brand-dark italic uppercase tracking-tighter">Visitec Control Center</h1>
          <p className="text-slate-500 mt-2">Kelola konten, produk, dan performa digital perusahaan.</p>
        </div>
        <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          {[
            { id: 'insight', label: 'Insights', icon: LayoutDashboard },
            { id: 'products', label: 'Produk', icon: Package },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB PRODUK */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1">
             <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 sticky top-32">
               <h2 className="text-2xl font-bold mb-8">Tambah Produk</h2>
               <form onSubmit={handleAddProduct} className="space-y-5">
                 <input type="text" placeholder="Nama Produk" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} />
                 <input type="number" placeholder="Harga (IDR)" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} />
                 <button disabled={loading} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl flex justify-center items-center gap-2 shadow-lg">
                   {loading ? <Loader2 className="animate-spin" /> : <Plus />} Publish Produk
                 </button>
               </form>
             </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-brand-dark italic">Katalog Produk Saat Ini</h3>
            <div className="grid grid-cols-1 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <div className="flex gap-5 items-center">
                    <img src={p.image_url} className="w-20 h-20 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-bold text-brand-dark text-lg">{p.name}</h4>
                      <p className="text-brand-primary font-black">Rp {Number(p.price).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  {/* TOMBOL HAPUS DENGAN ICON TRASH */}
                  <button onClick={() => handleDeleteProduct(p.id)} className="p-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                    <Trash2 size={22} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* TAB LAIN (Insight & Gallery) */}
      {activeTab === 'insight' && <p className="text-center py-20 text-slate-400">Statistik Performa Artikel Visitec.</p>}
      {activeTab === 'gallery' && <p className="text-center py-20 text-slate-400">Manajemen Galeri Kerja.</p>}
    </div>
  );
}

// Komponen StatCard (Tetap sama)
function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = { blue: "bg-blue-50 text-blue-600", green: "bg-green-50 text-green-600", purple: "bg-purple-50 text-purple-600" };
  return (
    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
      <div className={`w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center mb-6`}>
        <Icon size={28} />
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</p>
      <h2 className="text-4xl font-black text-brand-dark mt-2 tracking-tighter">{value}</h2>
    </div>
  );
}