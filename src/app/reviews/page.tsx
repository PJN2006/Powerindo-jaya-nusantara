'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Star, MessageSquare, Send, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '@/components/layout/Reveal'

export default function ReviewPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [formData, setFormData] = useState({ name: '', company: '', rating: 5, comment: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  
  // Logika Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => { fetchReviews() }, [])

  async function fetchReviews() {
    const { data } = await supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false })
    if (data) setReviews(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('reviews').insert([formData])
    if (!error) {
      setStatus('success')
      setFormData({ name: '', company: '', rating: 5, comment: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  // Perhitungan item untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(reviews.length / itemsPerPage)

  return (
    <main className="bg-slate-50 min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Kolom Kiri: Form Input (Sticky) */}
        <div className="lg:col-span-1">
          <Reveal>
            <div className="bg-white p-6 md:p-8 rounded-4xl shadow-sm border border-slate-100 sticky top-32">
              <h2 className="text-xl font-black text-brand-dark uppercase italic mb-6">Berikan Review</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Nama Anda" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-brand-primary text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="Nama Perusahaan (Opsional)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-brand-primary text-sm" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl justify-center">
                  {[1,2,3,4,5].map(num => (
                    <Star key={num} size={20} className={`cursor-pointer transition-colors ${num <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} onClick={() => setFormData({...formData, rating: num})} />
                  ))}
                </div>
                <textarea placeholder="Pesan Review Anda..." required className="w-full p-4 bg-slate-50 rounded-2xl h-28 outline-none border border-transparent focus:border-brand-primary text-sm resize-none" value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
                <button disabled={status === 'loading'} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all text-sm">
                  {status === 'success' ? <CheckCircle size={18}/> : <Send size={18} />} {status === 'success' ? 'TERKIRIM!' : 'KIRIM REVIEW'}
                </button>
                {status === 'success' && <p className="text-[10px] text-center font-bold text-brand-primary uppercase mt-2 italic">Menunggu moderasi admin sebelum ditampilkan.</p>}
              </form>
            </div>
          </Reveal>
        </div>

        {/* Kolom Kanan: Daftar Review */}
        <div className="lg:col-span-2 space-y-6">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-black text-brand-dark uppercase italic tracking-tighter mb-8">Client <span className="text-brand-primary">Feedback</span></h1>
          </Reveal>

          <div className="space-y-4">
            {currentReviews.length === 0 ? (
              <p className="italic text-slate-400">Belum ada review yang ditampilkan.</p>
            ) : (
              currentReviews.map((rev) => (
                <Reveal key={rev.id}>
                  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden transition-hover hover:border-brand-primary/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-brand-dark text-base">{rev.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{rev.company || 'Personal Client'}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic text-sm">"{rev.comment}"</p>
                    
                    {rev.reply && (
                      <div className="mt-4 p-4 bg-brand-dark/5 rounded-2xl border-l-4 border-brand-primary">
                        <p className="text-[9px] font-black text-brand-primary uppercase mb-1 tracking-tighter">Balasan Admin:</p>
                        <p className="text-xs text-brand-dark italic font-medium">{rev.reply}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))
            )}
          </div>

          {/* Navigasi Pagination */}
          {reviews.length > itemsPerPage && (
            <div className="flex items-center justify-center gap-4 pt-10">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full bg-white border border-slate-200 text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="text-sm font-bold text-brand-dark uppercase tracking-widest">
                Page <span className="text-brand-primary">{currentPage}</span> of {totalPages}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full bg-white border border-slate-200 text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}