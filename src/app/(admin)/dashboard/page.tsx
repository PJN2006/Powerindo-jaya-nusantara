'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, Package, Image as ImageIcon, Loader2, 
  Trash2, LayoutDashboard, FileText, UploadCloud, Save
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'insight' | 'products' | 'gallery'>('insight');
  const [loading, setLoading] = useState(false);
  
  // Data States
  const [posts, setPosts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  
  // Form States
  const [prodForm, setProdForm] = useState({ name: '', desc: '', price: '', file: null as File | null });
  const [postForm, setPostForm] = useState({ title: '', content: '', file: null as File | null });
  const [gallForm, setGallForm] = useState({ title: '', file: null as File | null });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data: postsData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    const { data: prodData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    const { data: gallData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (postsData) setPosts(postsData);
    if (prodData) setProducts(prodData);
    if (gallData) setGallery(gallData);
  }

  // --- HELPER: UPLOAD KE STORAGE ---
  const uploadToStorage = async (file: File, folder: string) => {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${fileName}`;
    const { error } = await supabase.storage.from('visitec-assets').upload(filePath, file);
    if (error) throw error;
    return supabase.storage.from('visitec-assets').getPublicUrl(filePath).data.publicUrl;
  };

  // --- HANDLER: TAMBAH PRODUK ---
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

  // --- HANDLER: PUBLISH ARTIKEL ---
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = '';
      if (postForm.file) url = await uploadToStorage(postForm.file, 'blog');
      
      await supabase.from('posts').insert([{ 
        title: postForm.title, 
        content: postForm.content, 
        image_url: url,
        slug: postForm.title.toLowerCase().replace(/ /g, '-')
      }]);
      alert('Artikel Berhasil Dipublish!');
      setPostForm({ title: '', content: '', file: null });
      fetchData();
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  // --- HANDLER: ADD GALLERY ---
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gallForm.file) return alert('Pilih foto gallery!');
    setLoading(true);
    try {
      const url = await uploadToStorage(gallForm.file, 'gallery');
      await supabase.from('gallery').insert([{ title: gallForm.title, image_url: url }]);
      alert('Foto berhasil ditambahkan ke Gallery!');
      setGallForm({ title: '', file: null });
      fetchData();
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-slate-50 min-h-screen">
      {/* HEADER NAVIGASI */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-brand-dark italic uppercase tracking-tighter">Visitec Control Center</h1>
          <p className="text-slate-500 mt-2">Kelola konten, produk, dan performa digital perusahaan.</p>
        </div>
        <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          {[{ id: 'insight', label: 'Insights', icon: LayoutDashboard }, { id: 'products', label: 'Produk', icon: Package }, { id: 'gallery', label: 'Gallery', icon: ImageIcon }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. TAB INSIGHTS: TULIS ARTIKEL */}
      {activeTab === 'insight' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-4xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><FileText className="text-brand-primary" /> Tulis Artikel Baru</h2>
              <form onSubmit={handleAddPost} className="space-y-6">
                <input type="text" placeholder="Judul Artikel" required className="w-full p-5 bg-slate-50 rounded-2xl outline-none text-xl font-bold" value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                <textarea placeholder="Mulai menulis konten di sini..." required className="w-full p-5 bg-slate-50 rounded-2xl outline-none h-80 resize-none" value={postForm.content} onChange={e => setPostForm({...postForm, content: e.target.value})} />
                <div className="flex items-center gap-4">
                  <input type="file" id="postImg" hidden onChange={e => setPostForm({...postForm, file: e.target.files?.[0] || null})} />
                  <label htmlFor="postImg" className="flex-1 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center cursor-pointer hover:bg-slate-50 transition-all font-bold text-slate-400">
                    {postForm.file ? postForm.file.name : "🖼️ Tambah Gambar Sampul"}
                  </label>
                  <button disabled={loading} className="px-10 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg flex items-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <Save />} Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-brand-dark italic">ARTIKEL TERBARU</h3>
            <div className="space-y-4">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-primary"><FileText size={20} /></div>
                  <p className="font-bold text-sm truncate">{post.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB PRODUK: TAMBAH & DESKRIPSI */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 sticky top-32">
              <h2 className="text-2xl font-bold mb-8">Tambah Produk</h2>
              <form onSubmit={handleAddProduct} className="space-y-5">
                <input type="text" placeholder="Nama Produk" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} />
                <input type="number" placeholder="Harga (IDR)" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} />
                <textarea placeholder="Deskripsi Singkat Produk..." required className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-32" value={prodForm.desc} onChange={e => setProdForm({...prodForm, desc: e.target.value})} />
                <div className="border-2 border-dashed border-slate-200 p-6 rounded-2xl text-center">
                  <input type="file" id="prodFile" hidden onChange={e => setProdForm({...prodForm, file: e.target.files?.[0] || null})} />
                  <label htmlFor="prodFile" className="cursor-pointer text-sm font-bold text-slate-400 flex flex-col items-center gap-2">
                    <UploadCloud /> {prodForm.file ? prodForm.file.name : "Upload Gambar Produk"}
                  </label>
                </div>
                <button disabled={loading} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg flex justify-center items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : <Plus />} Publish Produk
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-brand-dark italic uppercase">Katalog Saat Ini</h3>
            <div className="grid grid-cols-1 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <div className="flex gap-5 items-center">
                    <img src={p.image_url} className="w-20 h-20 rounded-2xl object-cover" />
                    <div><h4 className="font-bold text-brand-dark">{p.name}</h4><p className="text-brand-primary font-black">Rp {Number(p.price).toLocaleString('id-ID')}</p></div>
                  </div>
                  <button className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB GALLERY: ADD GALLERY */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-8">Add to Gallery</h2>
              <form onSubmit={handleAddGallery} className="space-y-6">
                <input type="text" placeholder="Judul Proyek/Foto" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={gallForm.title} onChange={e => setGallForm({...gallForm, title: e.target.value})} />
                <div className="border-2 border-dashed border-slate-200 p-10 rounded-3xl text-center">
                  <input type="file" id="gallFile" hidden onChange={e => setGallForm({...gallForm, file: e.target.files?.[0] || null})} />
                  <label htmlFor="gallFile" className="cursor-pointer flex flex-col items-center gap-3 text-slate-400 font-bold">
                    <ImageIcon size={40} /> {gallForm.file ? gallForm.file.name : "Pilih Foto Pekerjaan"}
                  </label>
                </div>
                <button disabled={loading} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg">Upload ke Gallery</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6">Preview Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map(item => (
                <div key={item.id} className="aspect-square rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative group">
                  <img src={item.image_url} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-4">
                    <p className="text-white text-xs font-bold text-center">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}