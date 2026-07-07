export default function AppPromo() {
  return (
    <div className="px-5 py-6">
      <div className="bg-[#cc0000] rounded-3xl overflow-hidden flex items-center relative h-56 shadow-lg">
        <div className="p-6 w-1/2 z-10">
          <h2 className="text-white text-2xl font-bold leading-tight mb-4">
            <span className="text-[#ffcc00]">Download</span> our app on the playstore
          </h2>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
            alt="Get it on Google Play" 
            className="h-10 bg-black rounded-lg" 
          />
        </div>
        
        {/* Phone mock positioned on the right */}
        <div className="absolute right-[-20px] top-6 w-56 h-[400px] bg-white rounded-3xl border-4 border-gray-200 shadow-2xl transform rotate-[-5deg]">
           <div className="w-16 h-4 bg-gray-200 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
           <div className="pt-12 px-4 flex flex-col items-center text-center">
             <span className="text-xs text-gray-800 font-bold mb-1">Welcome to</span>
             <img src="/buscar-logo.png" alt="Buscar" className="h-8 mb-4 object-contain" />
             <div className="text-[10px] text-red-700 font-bold uppercase tracking-wider">Passenger & Parcel Services</div>
           </div>
        </div>
      </div>
    </div>
  );
}
