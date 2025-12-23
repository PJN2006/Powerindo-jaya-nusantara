'use client';
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Tulis artikel di sini...</p>',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] border p-6 rounded-xl bg-white',
      },
    },
  });

  const handlePublish = async () => {
    if (!title || !editor) return;
    setLoading(true);

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const { error } = await supabase.from('posts').insert([
      {
        title,
        slug,
        image_url: imageUrl,
        content: editor.getJSON(),
      },
    ]);

    if (!error) {
      alert('Berhasil Posting!');
      router.push('/blog');
    } else {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-8">Buat Postingan Baru</h1>
      
      <div className="space-y-6">
        <input 
          type="text" 
          placeholder="Judul Artikel"
          className="w-full text-4xl font-bold border-none focus:ring-0 placeholder:text-slate-300"
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="URL Gambar Thumbnail"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="border-t pt-6">
          <EditorContent editor={editor} />
        </div>

        <button 
          onClick={handlePublish}
          disabled={loading}
          className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 transition-all"
        >
          {loading ? 'Sedang Mempublikasi...' : 'Publikasikan Artikel'}
        </button>
      </div>
    </div>
  );
}