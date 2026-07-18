import { useState, useEffect } from 'react';

export default function Carousel() {
  const slides = [
    {
      title: "TRAVEL TO MOMBASA",
      tagline: "Buy your travel tickets hustle free",
      bgColor: "bg-[#e8b917]", // Yellow matching the reference
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "TRAVEL TO KISUMU",
      tagline: "Buy your travel tickets hustle free",
      bgColor: "bg-[#4da934]", // Green
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "TRAVEL TO NAIROBI",
      tagline: "Buy your travel tickets hustle free",
      bgColor: "bg-[#2563eb]", // Blue
      image: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="px-1.5 py-6">
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-56 flex flex-col">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 flex flex-col ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Top Tagline bar */}
            <div className="bg-black/60 backdrop-blur-sm absolute top-0 left-0 right-0 py-2 px-4 flex justify-between items-center z-20">
              <img src="/buscar-logo.png" alt="Buscar Logo" className="h-8 object-contain" />
              <span className="text-white text-xs font-bold">{slide.tagline}</span>
            </div>
            
            {/* Image section */}
            <div className="relative flex-1">
              <div className={`absolute inset-0 opacity-80 mix-blend-multiply ${slide.bgColor}`} />
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            </div>

            {/* Bottom Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent z-20 flex justify-between items-end pb-8">
              <h3 className="text-white font-black text-2xl w-[60%] leading-tight uppercase drop-shadow-lg">
                {slide.title}
              </h3>
              <a 
                href="https://wa.me/254754303484?text=Hello,%20I%20want%20to%20book%20a%20ticket"
                target="_blank" rel="noreferrer"
                className="bg-[#e62933] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-full whitespace-nowrap shadow-lg transition-transform active:scale-95"
              >
                BOOK YOUR TICKET
              </a>
            </div>
          </div>
        ))}
        
        {/* Pagination Dots */}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${index === current ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
