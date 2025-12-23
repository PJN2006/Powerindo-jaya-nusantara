import { supabase } from '@/lib/supabase';
import { BarChart3, FileText, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  // Mengambil semua data postingan
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('views', { ascending: false });

  // Menghitung total statistik
  const totalPosts = posts?.length || 0;
  const totalViews = posts?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark">Dashboard Insight</h1>
          <p className="text-slate-500">Pantau performa konten korporat Visitec Anda.</p>
        </div>
        <Link 
          href="/write" 
          className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all w-fit"
        >
          <Plus size={20} /> Tulis Artikel Baru
        </Link>
      </div>

      {/* Ringkasan Statistik dalam Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center mb-4">
            <FileText size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Postingan</p>
          <h2 className="text-4xl font-bold text-brand-dark mt-1">{totalPosts}</h2>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
            <Eye size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Pembaca</p>
          <h2 className="text-4xl font-bold text-brand-dark mt-1">{totalViews.toLocaleString()}</h2>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <BarChart3 size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Rata-rata View</p>
          <h2 className="text-4xl font-bold text-brand-dark mt-1">
            {totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0}
          </h2>
        </div>
      </div>

      {/* Tabel Detail Postingan */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h3 className="font-bold text-brand-dark">Performa Tiap Artikel</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Judul Artikel</th>
                <th className="px-6 py-4">Tanggal Rilis</th>
                <th className="px-6 py-4 text-center">Jumlah View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts?.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-brand-dark">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(post.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-50 text-brand-primary px-3 py-1 rounded-full text-xs font-bold">
                      {post.views} Views
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}