import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/254710492539"
      target="_blank" rel="noreferrer"
      className="fixed bottom-24 right-5 bg-black text-white p-4 rounded-full shadow-2xl z-50 hover:bg-gray-800 transition-all hover:scale-110 flex items-center justify-center border-2 border-white"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </a>
  );
}
