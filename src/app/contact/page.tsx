import { MessageCircle, Facebook, Instagram, Phone, MapPin, Mail } from 'lucide-react';
import Reveal from '@/components/layout/Reveal';

export default function ContactPage() {
  const socialMedia = [
    { 
      name: 'WhatsApp Business', 
      label: 'Chat Fast Response', 
      link: 'https://wa.me/6281252505111', 
      icon: MessageCircle, 
      color: 'bg-green-500' 
    },
    { 
      name: 'Facebook Page', 
      label: 'Powerindo Jaya Nusantara', 
      link: 'https://www.facebook.com/Powerindoo/', 
      icon: Facebook, 
      color: 'bg-blue-600' 
    },
    { 
      name: 'TikTok Business', 
      label: '@powerindojayanusantara', 
      link: 'https://www.tiktok.com/@powerindojayanusantara', 
      icon: Phone, // Menggunakan icon Phone sebagai representasi gadget
      color: 'bg-black' 
    }
  ];

  return (
    <main className="bg-slate-50 min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black text-brand-dark italic uppercase tracking-tighter mb-6">Contact Us</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">Terhubung langsung dengan tim ahli kami untuk konsultasi infrastruktur digital dan solusi enterprise.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {socialMedia.map((social, i) => (
            <Reveal key={i}>
              <a 
                href={social.link} 
                target="_blank" 
                className="group bg-white p-8 rounded-4xl border border-slate-200 flex flex-col items-center text-center hover:border-brand-primary transition-all shadow-sm hover:shadow-xl"
              >
                <div className={`${social.color} text-white p-5 rounded-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  <social.icon size={32} />
                </div>
                <h3 className="font-bold text-xl text-brand-dark mb-1">{social.name}</h3>
                <p className="text-slate-400 text-sm">{social.label}</p>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Info Alamat tambahan agar profesional */}
        <Reveal>
          <div className="bg-brand-dark rounded-4xl p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="bg-brand-primary/20 p-4 rounded-full text-brand-primary">
                <MapPin size={30} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Kantor Pusat</h4>
                <p className="text-slate-400">Kawasan Industri Terpadu, Indonesia</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-brand-primary/20 p-4 rounded-full text-brand-primary">
                <Mail size={30} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Email Resmi</h4>
                <p className="text-slate-400">powerindo1230@gmail.com</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}