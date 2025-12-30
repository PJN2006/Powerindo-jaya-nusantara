'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { X, Megaphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    fetchLatestAnnouncement()
  }, [])

  // Logika untuk mengatur jarak Navbar secara dinamis
  useEffect(() => {
    fetchLatestAnnouncement();

    // LOGIKA OTOMATIS: Cek setiap 30 detik apakah pengumuman sudah kadaluwarsa
    const interval = setInterval(() => {
        if (announcement?.expires_at) {
        const now = new Date();
        const expiry = new Date(announcement.expires_at);
        
        if (now > expiry) {
            setIsVisible(false); // Otomatis sembunyikan jika sudah lewat waktunya
        }
        }
    }, 30000); 

    return () => clearInterval(interval);
    }, [announcement]);

  async function fetchLatestAnnouncement() {
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .or(`expires_at.is.null,expires_at.gt."${now}"`) 
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
    
    if (data){
        setAnnouncement(data);
    } else {
        setAnnouncement(null);
    }
  }

  if (!announcement || !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && announcement && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '40px', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="fixed top-0 left-0 w-full z-100 bg-brand-primary text-white flex items-center shadow-md overflow-hidden"
        >
          <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <Megaphone size={14} className="shrink-0 animate-bounce" />
              <p className="text-[10px] md:text-xs font-bold truncate uppercase tracking-wider">
                <span className="opacity-70 mr-2">[{announcement.subject}]</span>
                {announcement.message}
              </p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}