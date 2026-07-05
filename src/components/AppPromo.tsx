export default function AppPromo() {
  return (
    <div className="px-5 py-12 bg-white flex flex-col items-center border-t border-gray-100">
      {/* Phone Mockup */}
      <div className="relative w-[220px] h-[450px] border-[8px] border-[#1a1a1a] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl bg-white flex items-center justify-center">
        {/* Notch */}
        <div className="absolute top-0 w-32 h-6 bg-[#1a1a1a] rounded-b-3xl flex items-center justify-center gap-2">
           <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
           <div className="w-2 h-2 rounded-full bg-indigo-900/50 border border-indigo-800/30"></div>
        </div>
        
        {/* Screen Content */}
        <div className="text-4xl font-black text-[#2e407e] flex items-center tracking-tight">
          <div className="relative flex flex-col items-center mr-1">
            <span className="text-red-500 text-5xl leading-none">T</span>
            <div className="absolute bottom-1 w-full flex justify-between px-1">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            </div>
          </div>
          ravler
        </div>
      </div>
      
      {/* App Store Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-[240px]">
        <button className="bg-black hover:bg-gray-900 text-white rounded-xl px-5 py-3 transition-colors flex items-center justify-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
            alt="Get it on Google Play" 
            className="h-10" 
          />
        </button>
        <button className="bg-black hover:bg-gray-900 text-white rounded-xl px-5 py-3 transition-colors flex items-center justify-center">
           <img 
             src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
             alt="Download on the App Store" 
             className="h-10" 
           />
        </button>
      </div>
    </div>
  );
}
