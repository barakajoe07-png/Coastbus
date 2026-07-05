import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-28 px-5 flex flex-col items-center text-center">
      <div className="flex flex-col items-center mb-10 gap-6">
        <img src="/tahmeed-logo.png" alt="Tahmeed Logo" className="h-10 object-contain" />

        {/* Travler Logo */}
        <div className="text-3xl font-black flex items-center tracking-tight text-gray-400 mt-2 opacity-80">
          <div className="relative flex flex-col items-center mr-1">
            <span className="text-red-600 text-4xl leading-none drop-shadow-sm">T</span>
            <div className="absolute bottom-0 w-full flex justify-between px-0.5">
               <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
            </div>
          </div>
          ravler
        </div>
        
        {/* Voltic Logo */}
        <div className="flex flex-col items-center mt-2">
          <div className="text-2xl font-black text-red-500 tracking-widest flex items-center italic">
            <span className="text-3xl mr-1 font-light opacity-80">=</span> VOLTIC
          </div>
          <span className="text-xs text-gray-400 mt-1 font-medium">Powered by voltic</span>
        </div>
      </div>

      <div className="mb-10 w-full max-w-sm">
        <h4 className="mb-5 text-sm font-medium">Download App</h4>
        <div className="flex gap-4 justify-center">
          <button className="bg-gray-800 text-white rounded-lg px-3 py-2 flex items-center justify-center flex-1 max-w-[140px]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-7" />
          </button>
          <button className="bg-gray-800 text-white rounded-lg px-3 py-2 flex items-center justify-center flex-1 max-w-[140px]">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-7" />
          </button>
        </div>
        <a href="/source-code.zip" download className="block mt-4 text-xs text-gray-400 hover:text-white transition-colors">
            Download Source Code
        </a>
      </div>

      <div className="w-full h-px bg-gray-700/50 mb-8" />

      <a href="mailto:info@tahmeedexpress.com" className="flex items-center gap-3 mb-8 text-sm font-medium hover:text-gray-400 transition-colors">
        <Mail className="w-5 h-5" />
        info@tahmeedexpress.com
      </a>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-300 mb-10 font-medium">
        <a href="#" className="hover:text-white transition-colors">About</a>
        <a href="#" className="hover:text-white transition-colors">Print Ticket</a>
        <a href="#" className="hover:text-white transition-colors">Get In Touch</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
      </div>

      <div className="flex gap-8">
        <a href="#" className="hover:text-gray-400 transition-colors"><Facebook className="w-6 h-6" fill="currentColor" strokeWidth={0} /></a>
        {/* X / Twitter icon */}
        <a href="#" className="hover:text-gray-400 transition-colors">
          <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="#" className="hover:text-gray-400 transition-colors"><Linkedin className="w-6 h-6" fill="currentColor" strokeWidth={0} /></a>
      </div>
    </footer>
  );
}
