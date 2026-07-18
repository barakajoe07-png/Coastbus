import { useState, useEffect } from 'react';
import { Bus, Clock, DollarSign, HelpCircle, ChevronDown, ChevronUp, MapPin, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import RouteMap from './RouteMap';

const galleryItems = [
  {
    url: '/buscar_banner_routes.jpg',
    title: 'VIP Nairobi Express Cabin',
    tag: 'VIP Cabin',
    desc: 'Experience ultimate luxury on our primary routes to Nairobi. Our modern passenger cabin is fully outfitted with premium soft leather recliners, individual high-power USB charging ports, and personal tray tables.'
  },
  {
    url: '/buscar_pink_eagle.jpg',
    title: 'Nairobi Executive Reclining Seats',
    tag: 'Premium Seats',
    desc: 'Sink into our custom, fully adjustable extra-wide reclining seats with dynamic lumbar support and integrated calf rests. Specially configured in a spacious 2x1 layout for a first-class journey to Nairobi.'
  },
  {
    url: '/buscar_silver_fernandes.jpg',
    title: 'Royal Sleeper Coach to Nairobi',
    tag: 'Royal Fleet',
    desc: 'Our flagship long-distance cruiser, fully optimized with luxurious orthopedic sleeping berths, generous personal storage compartments, and high-speed onboard Wi-Fi connectivity for uninterrupted travel.'
  },
  {
    url: '/buscar_interior_led.jpg',
    title: 'First-Class Nairobi Night Cruiser',
    tag: 'Night Cabin',
    desc: 'Unwind at night under our calming, eye-safe blue and red LED neon ambient light strips. Designed to offer a highly peaceful, noise-insulated, and cozy overnight travel experience directly to Nairobi.'
  },
  {
    url: '/buscar_green_scania.jpg',
    title: 'Nairobi Business-Class Fleet',
    tag: 'Business Class',
    desc: 'Our modern, state-of-the-art fleet of business-class Scania coaches, highly recognizable for offering exceptional road safety, full air-suspension comfort, and professional onboard crew service.'
  }
];

export default function SEORoutesContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openRouteIndex, setOpenRouteIndex] = useState<number | null>(null);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGalleryIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [currentGalleryIdx]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const seoRoutes = [
    {
      from: 'Nairobi',
      to: 'Mombasa',
      fare: 'KES 1500 - 2500',
      duration: '8–10 hours',
      frequency: 'Multiple departures daily (Morning & Night)',
      desc: 'Our popular route connecting Kenya\'s capital city to the coastal beach destination of Mombasa. Perfect for business travelers and tourists alike.'
    },
    {
      from: 'Mombasa',
      to: 'Nairobi',
      fare: 'KES 1500 - 2500',
      duration: '8–10 hours',
      frequency: 'Multiple departures daily (Morning & Night)',
      desc: 'Return trip from the coast to the capital. Comfortable luxury reclining seats, AC, charging ports, and onboard entertainment.'
    },
    {
      from: 'Nairobi',
      to: 'Kampala (Uganda)',
      fare: 'KES 2500 - 5000',
      duration: '11–13 hours',
      frequency: 'Daily departures (Evening schedules)',
      desc: 'Our premier cross-border route connecting Kenya and Uganda. Comfortable direct service with simplified border clearance assistance.'
    },
    {
      from: 'Nairobi',
      to: 'Malindi',
      fare: 'KES 2000',
      duration: '10–11 hours',
      frequency: 'Daily departures',
      desc: 'Direct executive Scania cruiser service from Nairobi to the serene and historical coastal town of Malindi.'
    },
    {
      from: 'Nairobi',
      to: 'Kilifi',
      fare: 'KES 2000 - 2500',
      duration: '9–10 hours',
      frequency: 'Daily scheduled trips',
      desc: 'Executive coach service directly connecting Nairobi to the beautiful coastal town of Kilifi.'
    },
    {
      from: 'Nairobi',
      to: 'Mtwapa',
      fare: 'KES 1700 - 2000',
      duration: '9–11 hours',
      frequency: 'Daily coastal departures',
      desc: 'Direct premium connection from Nairobi to the vibrant coastal town of Mtwapa, offering absolute convenience and safety.'
    },
    {
      from: 'Eldoret',
      to: 'Nairobi',
      fare: 'KES 1500 - 2600',
      duration: '5–6 hours',
      frequency: 'Daily morning & afternoon departures',
      desc: 'Connecting Eldoret to Nairobi with exceptional travel times and premium Scania seat configurations.'
    },
    {
      from: 'Eldoret',
      to: 'Kampala (Uganda)',
      fare: 'KES 3000 - 4000',
      duration: '6–8 hours',
      frequency: 'Daily evening schedules',
      desc: 'Sleek cross-border passenger cruiser service linking Eldoret to Kampala with simplified immigration support.'
    }
  ];

  const faqs = [
    {
      q: "How do I perform an online Buscar booking?",
      a: "Making an online Buscar booking is quick and simple! Use the booking form at the top of this page to select your departure city, destination, and travel date. Tap search, choose your preferred seat, enter passenger details, and complete your reservation instantly via WhatsApp with our dedicated ticket booking assistants."
    },
    {
      q: "What is the buscar booking price from Nairobi to Mombasa?",
      a: "Our Nairobi to Mombasa bus tickets are highly affordable, ranging from KES 1400 to KES 3000 depending on the luxury class of the bus (Standard, VIP, or Business Class). Booking online ensures you secure your seat early with the best available promotions."
    },
    {
      q: "Do you have direct bus routes to Kampala, Lamu, and Mtwapa?",
      a: "Yes! We operate highly sought-after direct routes including Nairobi to Kampala (and vice-versa), Nairobi to Lamu (fare KES 2200), and Nairobi to Mtwapa (fare KES 1800). Enjoy maximum onboard amenities including free Wi-Fi, premium charging ports, and complimentary mineral water."
    },
    {
      q: "What are the benefits of using Buscar booking via Travler and Voltic?",
      a: "Our booking interface is powered by Travler and Voltic to provide a flawless, mobile-optimized experience. You get instant access to 24/7 customer support via WhatsApp, a comprehensive visual seat selector, real-time schedule tracking, and automatic discount rewards up to 25%."
    }
  ];


  return (
    <section className="px-1.5 py-10 bg-gray-50 border-t border-gray-100 rounded-t-[2rem] -mt-6 relative z-10 space-y-10">
      <div className="max-w-md mx-auto space-y-9">
        
        {/* SEO Header - Primary Keywords */}
        <div className="text-center pt-2 px-3.5">
          <span className="text-[10px] bg-red-100 text-red-600 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Official Travel Hub
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-3 tracking-tight">
            Buscar Online Booking
          </h1>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            Welcome to the ultimate platform for <strong>buscar booking</strong>. 
            Enjoy reliable, safe, and luxury bus travel across East Africa. Book your tickets online today!
          </p>
        </div>

        {/* Dynamic Routes & Fares Directory */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 px-3.5">
            <Bus className="w-5 h-5 text-[#36498c]" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Top Buscar Bus Routes & Fares
            </h2>
          </div>
          
          <div className="space-y-3 px-1.5">
            {seoRoutes.map((route, i) => {
              const isOpen = openRouteIndex === i;
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl border border-gray-100/95 shadow-[0_2px_12px_rgba(15,23,42,0.015)] hover:shadow-md hover:border-[#36498c]/20 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Compact Clickable Header */}
                  <div 
                    onClick={() => setOpenRouteIndex(isOpen ? null : i)}
                    className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-red-50 text-red-600' : 'bg-[#36498c]/5 text-[#36498c]'}`}>
                        <Bus className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5 font-extrabold text-gray-900 text-sm tracking-tight">
                          <span>{route.from}</span>
                          <span className="text-gray-400 font-normal text-xs">➔</span>
                          <span className="text-red-600">{route.to.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                            {route.duration} Trip
                          </span>
                          <span className="text-[10px] text-gray-300">•</span>
                          <span className="text-[9px] font-bold text-[#36498c]/80 uppercase tracking-wider">
                            Express Coach
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right shrink-0">
                        <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-wider">Fare from</span>
                        <span className="font-extrabold text-xs text-emerald-600">{route.fare.split(' - ')[0]}</span>
                      </div>
                      <div className={`p-1.5 rounded-full bg-gray-50 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-red-50 text-red-600' : 'group-hover:bg-gray-100 group-hover:text-gray-600'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Drop Down Panel */}
                  {isOpen && (
                    <div className="border-t border-gray-100/80 p-3 bg-slate-50/20 animate-in fade-in slide-in-from-top duration-300">
                      <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-gray-100/50 shadow-2xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Estimated Time</span>
                          <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-[#36498c]" />
                            {route.duration}
                          </span>
                        </div>
                        
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Ticket Fares</span>
                          <span className="text-xs font-black text-emerald-600 flex items-center gap-1 mt-0.5">
                            {route.fare}
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.dispatchEvent(new CustomEvent('select-route', { 
                              detail: { 
                                from: route.from,
                                to: route.to.includes('Kampala') ? 'Kampala' : route.to
                              } 
                            }));
                          }}
                          className="px-4.5 py-2.5 bg-[#36498c] hover:bg-red-600 text-white font-extrabold text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Route Map */}
        <div className="px-1">
          <RouteMap />
        </div>

        {/* Fleet & Gallery Section with real assets as a Carousel */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 px-3.5">
            <Camera className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Our Elite Bus Fleet & Cabin
            </h2>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed px-3.5">
            Take a visual tour of our luxury passenger coaches. Tap the image to inspect details of our modern cabins and clean vehicle profiles.
          </p>

          <div className="relative px-1">
            {/* Gallery Carousel Container */}
            <div 
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group/gallery"
              onClick={() => setSelectedImage(galleryItems[currentGalleryIdx].url)}
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img 
                  src={galleryItems[currentGalleryIdx].url} 
                  alt={galleryItems[currentGalleryIdx].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Left & Right navigation overlays */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2.5 z-10 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGalleryIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
                    }}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm transition-all active:scale-90 pointer-events-auto cursor-pointer"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGalleryIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
                    }}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm transition-all active:scale-90 pointer-events-auto cursor-pointer"
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[9px] bg-[#36498c] text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {galleryItems[currentGalleryIdx].tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                  <h3 className="font-bold text-xs tracking-tight">{galleryItems[currentGalleryIdx].title}</h3>
                </div>
              </div>
              <div className="p-3.5 bg-white">
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {galleryItems[currentGalleryIdx].desc}
                </p>
              </div>
            </div>

            {/* Carousel dots indicator */}
            <div className="flex justify-center gap-1.5 mt-3">
              {galleryItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentGalleryIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentGalleryIdx ? 'w-5 bg-[#36498c]' : 'w-1.5 bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Search Helper Box */}
        <div className="mx-1.5 bg-[#36498c] text-white p-6 rounded-3xl shadow-md text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-6 -mt-6 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-red-600/10 rounded-full -ml-6 -mb-6 pointer-events-none" />
          
          <h3 className="font-extrabold text-base mb-1.5">Looking for "Online Buscar" Booking?</h3>
          <p className="text-xs text-blue-100 mb-4 leading-relaxed">
            Get instant assistance, confirm seat availability, and finalize your tickets via WhatsApp.
          </p>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.dispatchEvent(new CustomEvent('focus-search'));
            }}
            className="bg-white text-[#36498c] text-xs font-bold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition-all uppercase tracking-wider active:scale-95"
          >
            Start Booking Now
          </button>
        </div>

        {/* Expandable SEO FAQ - Structured For Schema.org Relevance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 px-3.5">
            <HelpCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Buscar Booking FAQ
            </h2>
          </div>

          <div className="space-y-3 px-1">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-4 pb-4 pt-2 text-xs text-gray-500 border-t border-gray-100 leading-relaxed bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox / Image Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-sm w-full bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl">
            <button 
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/90 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all active:scale-90"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged Bus Gallery View" 
              className="w-full h-auto object-contain max-h-[60vh]"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 text-center bg-neutral-900">
              <p className="text-[11px] text-gray-400 font-medium">Tap anywhere to return to booking</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
