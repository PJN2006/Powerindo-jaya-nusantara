'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Star, MessageSquare, Send, CheckCircle } from 'lucide-react'
import Reveal from '@/components/layout/Reveal'

export default function ReviewPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [formData, setFormData] = useState({ name: '', company: '', rating: 5, comment: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

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

  return (
    <main className="bg-slate-50 min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Kolom Kiri: Form Input */}
        <div className="lg:col-span-1">
          <Reveal>
            <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 sticky top-32">
              <h2 className="text-2xl font-black text-brand-dark uppercase italic mb-6">Berikan Review</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Nama Anda" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-brand-primary" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="Nama Perusahaan (Opsional)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-brand-primary" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl justify-center">
                  {[1,2,3,4,5].map(num => (
                    <Star key={num} size={24} className={`cursor-pointer transition-colors ${num <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} onClick={() => setFormData({...formData, rating: num})} />
                  ))}
                </div>
                <textarea placeholder="Pesan Review Anda..." required className="w-full p-4 bg-slate-50 rounded-2xl h-32 outline-none border border-transparent focus:border-brand-primary" value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
                <button disabled={status === 'loading'} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  {status === 'success' ? <CheckCircle size={20}/> : <Send size={20} />} {status === 'success' ? 'TERKIRIM!' : 'KIRIM REVIEW'}
                </button>
                {status === 'success' && <p className="text-[10px] text-center font-bold text-brand-primary uppercase mt-2 italic">Menunggu moderasi admin sebelum ditampilkan.</p>}
              </form>
            </div>
          </Reveal>
        </div>

        {/* Kolom Kanan: Daftar Review */}
        <div className="lg:col-span-2 space-y-8">
          <Reveal>
            <h1 className="text-5xl font-black text-brand-dark uppercase italic tracking-tighter mb-10">Client <span className="text-brand-primary">Feedback</span></h1>
          </Reveal>
          {reviews.length === 0 ? <p className="italic text-slate-400">Belum ada review yang ditampilkan.</p> : reviews.map((rev) => (
            <Reveal key={rev.id}>
              <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg">{rev.name}</h4>
                    <p className="text-xs text-slate-400 uppercase tracking-widest">{rev.company || 'Personal Client'}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                {rev.reply && (
                  <div className="mt-6 p-6 bg-brand-dark/5 rounded-3xl border-l-4 border-brand-primary">
                    <p className="text-[10px] font-bold text-brand-primary uppercase mb-2">Balasan Admin:</p>
                    <p className="text-sm text-brand-dark italic font-medium">{rev.reply}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}