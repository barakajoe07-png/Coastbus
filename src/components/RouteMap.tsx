import { useState, useEffect } from 'react';
import { Map, Compass, ArrowRight, Check, RefreshCw, Navigation, ChevronDown, ChevronUp, Search } from 'lucide-react';

// Geographic Coordinates Mapping
const cityCoords: Record<string, { x: number; y: number; labelOffset: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'bottom-left' }> = {
  'Kampala': { x: 35, y: 110, labelOffset: 'top' },
  'Busia': { x: 75, y: 115, labelOffset: 'bottom' },
  'Eldoret': { x: 115, y: 105, labelOffset: 'top' },
  'Kisumu': { x: 95, y: 135, labelOffset: 'left' },
  'Kisii': { x: 90, y: 160, labelOffset: 'bottom' },
  'Kericho': { x: 125, y: 145, labelOffset: 'right' },
  'Bomet': { x: 115, y: 175, labelOffset: 'bottom' },
  'Nakuru': { x: 160, y: 140, labelOffset: 'top' },
  'Nanyuki': { x: 200, y: 110, labelOffset: 'top' },
  'Nyeri': { x: 195, y: 128, labelOffset: 'left' },
  'Meru': { x: 220, y: 105, labelOffset: 'right' },
  'Embu': { x: 210, y: 140, labelOffset: 'right' },
  'Thika': { x: 200, y: 160, labelOffset: 'right' },
  'Nairobi': { x: 190, y: 180, labelOffset: 'left' },
  'Kitui': { x: 235, y: 180, labelOffset: 'bottom' },
  'Mombasa': { x: 285, y: 260, labelOffset: 'left' },
  'Mtwapa': { x: 295, y: 250, labelOffset: 'right' },
  'Kilifi': { x: 305, y: 240, labelOffset: 'right' },
  'Malindi': { x: 315, y: 225, labelOffset: 'right' },
  'Lamu': { x: 335, y: 195, labelOffset: 'right' }
};

const resolveCityName = (city: string): string => {
  const c = city.trim();
  if (cityCoords[c]) return c;
  if (c === 'Kampala' || c.includes('Kampala')) return 'Kampala';

  const lower = c.toLowerCase();
  if (lower.includes('bomet')) return 'Bomet';
  if (lower.includes('bondo')) return 'Kisumu';
  if (lower.includes('bungoma')) return 'Eldoret';
  if (lower.includes('busia')) return 'Busia';
  if (lower.includes('chuka')) return 'Embu';
  if (lower.includes('embu')) return 'Embu';
  if (lower.includes('homa bay') || lower.includes('homabay')) return 'Kisumu';
  if (lower.includes('isiolo')) return 'Meru';
  if (lower.includes('kakamega')) return 'Kisumu';
  if (lower.includes('kathwana')) return 'Embu';
  if (lower.includes('kehancha')) return 'Kisii';
  if (lower.includes('kendu bay') || lower.includes('kendubay')) return 'Kisumu';
  if (lower.includes('kitale')) return 'Eldoret';
  if (lower.includes('kitui')) return 'Kitui';
  if (lower.includes('lamu')) return 'Lamu';
  if (lower.includes('malaba')) return 'Busia';
  if (lower.includes('mbita')) return 'Kisumu';
  if (lower.includes('meru')) return 'Meru';
  if (lower.includes('mumias')) return 'Kisumu';
  if (lower.includes('nyadorera')) return 'Busia';
  if (lower.includes('oyugis')) return 'Kisii';
  if (lower.includes('port victoria')) return 'Busia';
  if (lower.includes('siaya')) return 'Kisumu';
  if (lower.includes('sirare')) return 'Kisii';
  if (lower.includes('usenge')) return 'Kisumu';
  if (lower.includes('webuye')) return 'Eldoret';
  if (lower.includes('nakuru')) return 'Nakuru';
  if (lower.includes('nanyuki')) return 'Nanyuki';
  if (lower.includes('nyeri')) return 'Nyeri';
  if (lower.includes('thika')) return 'Thika';
  
  return 'Nairobi';
};

const getRoutePathPoints = (fromCity: string, toCity: string): string[] => {
  const start = resolveCityName(fromCity);
  const end = resolveCityName(toCity);

  if (start === end) return [start];

  const westCities = ['Kampala', 'Busia', 'Eldoret', 'Kisumu', 'Kisii', 'Kericho', 'Bomet'];
  const mtKenyaCities = ['Nanyuki', 'Nyeri', 'Meru', 'Embu', 'Thika'];
  const coastalCities = ['Mombasa', 'Mtwapa', 'Kilifi', 'Malindi', 'Lamu'];

  const isWest = (city: string) => westCities.includes(city);
  const isMtKenya = (city: string) => mtKenyaCities.includes(city);
  const isCoast = (city: string) => coastalCities.includes(city);

  // Coast-only route progression
  if (isCoast(start) && isCoast(end)) {
    const coastPath = ['Mombasa', 'Mtwapa', 'Kilifi', 'Malindi', 'Lamu'];
    const idxStart = coastPath.indexOf(start);
    const idxEnd = coastPath.indexOf(end);
    if (idxStart !== -1 && idxEnd !== -1) {
      if (idxStart < idxEnd) {
        return coastPath.slice(idxStart, idxEnd + 1);
      } else {
        return coastPath.slice(idxEnd, idxStart + 1).reverse();
      }
    }
  }

  // West-only route progression
  if (isWest(start) && isWest(end)) {
    if (start === 'Kampala' && end === 'Bomet') return ['Kampala', 'Eldoret', 'Kericho', 'Bomet'];
    if (start === 'Bomet' && end === 'Kampala') return ['Bomet', 'Kericho', 'Eldoret', 'Kampala'];
    return [start, end];
  }

  // Helper: Inland to Nairobi hub
  const getPathToNairobi = (city: string): string[] => {
    if (city === 'Nairobi') return ['Nairobi'];
    if (isWest(city)) {
      if (city === 'Kampala') return ['Kampala', 'Eldoret', 'Nakuru', 'Nairobi'];
      if (city === 'Busia') return ['Busia', 'Eldoret', 'Nakuru', 'Nairobi'];
      if (city === 'Eldoret') return ['Eldoret', 'Nakuru', 'Nairobi'];
      if (city === 'Nakuru') return ['Nakuru', 'Nairobi'];
      return [city, 'Nakuru', 'Nairobi'];
    }
    if (isMtKenya(city)) {
      if (city === 'Thika') return ['Thika', 'Nairobi'];
      return [city, 'Thika', 'Nairobi'];
    }
    if (city === 'Kitui') return ['Kitui', 'Nairobi'];
    return [city, 'Nairobi'];
  };

  // Helper: Nairobi to Coast city
  const getPathNairobiToCoast = (coastCity: string): string[] => {
    const coastSection = ['Mombasa', 'Mtwapa', 'Kilifi', 'Malindi', 'Lamu'];
    const targetIdx = coastSection.indexOf(coastCity);
    if (targetIdx === -1) return ['Nairobi', 'Mombasa'];
    return ['Nairobi', ...coastSection.slice(0, targetIdx + 1)];
  };

  // Connect through Nairobi hub
  if (isCoast(end)) {
    const toNairobi = getPathToNairobi(start);
    const fromNairobi = getPathNairobiToCoast(end);
    return [...toNairobi.slice(0, -1), ...fromNairobi];
  }

  if (isCoast(start)) {
    const fromNairobi = getPathToNairobi(end).reverse();
    const toNairobi = getPathNairobiToCoast(start).reverse();
    return [...toNairobi.slice(0, -1), ...fromNairobi];
  }

  const pathStart = getPathToNairobi(start);
  const pathEnd = getPathToNairobi(end);
  const endPart = [...pathEnd].reverse().slice(1);
  return [...pathStart, ...endPart];
};

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  disabledOption?: string;
}

function CustomDropdown({ label, value, options, onChange, disabledOption }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full text-left" onClick={(e) => e.stopPropagation()}>
      <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-0.5">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-100 text-[11px] font-extrabold text-gray-800 rounded-xl px-2.5 py-2 flex items-center justify-between shadow-xs hover:border-gray-200 active:scale-98 transition-all cursor-pointer"
      >
        <span className="truncate">{value}</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-gray-50 flex items-center gap-1.5 bg-gray-50/50">
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-[11px] font-semibold text-gray-700 placeholder-gray-400 focus:outline-none p-0.5"
              autoFocus
            />
          </div>

          <ul className="max-h-40 overflow-y-auto py-1.5 scrollbar-thin">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isDisabled = opt === disabledOption;
                const isSelected = opt === value;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => {
                        onChange(opt);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[11px] font-bold flex items-center justify-between transition-colors ${
                        isDisabled
                          ? 'text-gray-300 bg-gray-50/45 cursor-not-allowed'
                          : isSelected
                          ? 'text-[#36498c] bg-blue-50/70 hover:bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#36498c] stroke-[3]" />}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2.5 text-[10px] text-gray-400 text-center font-bold">
                No cities found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function RouteMap() {
  const [origin, setOrigin] = useState('Nairobi');
  const [destination, setDestination] = useState('Mombasa');
  const [activePath, setActivePath] = useState<string[]>([]);
  const [applied, setApplied] = useState(false);

  // Sync with global custom event if booking form alters search
  useEffect(() => {
    const handleGlobalSelect = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { from, to } = customEvent.detail;
        if (from) setOrigin(from);
        if (to) setDestination(to);
        setApplied(true);
        setTimeout(() => setApplied(false), 2000);
      }
    };
    window.addEventListener('select-route', handleGlobalSelect);
    return () => window.removeEventListener('select-route', handleGlobalSelect);
  }, []);

  // Compute active route path whenever selection updates
  useEffect(() => {
    const path = getRoutePathPoints(origin, destination);
    setActivePath(path);
  }, [origin, destination]);

  const originCoords = cityCoords[resolveCityName(origin)] || { x: 190, y: 180 };
  const destCoords = cityCoords[resolveCityName(destination)] || { x: 285, y: 260 };

  const pathCoordinates = activePath.map(city => {
    const resolved = resolveCityName(city);
    return cityCoords[resolved] || { x: 190, y: 180 };
  });

  const generateSvgPath = (coords: Array<{ x: number; y: number }>) => {
    if (coords.length === 0) return '';
    return coords.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  const svgPathString = generateSvgPath(pathCoordinates);

  const applyRouteToForm = () => {
    window.dispatchEvent(new CustomEvent('select-route', {
      detail: { from: origin, to: destination }
    }));
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Get offset settings for labels to prevent overlapping text
  const getLabelAnchor = (offset: string) => {
    if (offset === 'left') return { textAnchor: 'end', dx: -8, dy: 3 };
    if (offset === 'right') return { textAnchor: 'start', dx: 8, dy: 3 };
    if (offset === 'top') return { textAnchor: 'middle', dx: 0, dy: -9 };
    return { textAnchor: 'middle', dx: 0, dy: 11 };
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(15,23,42,0.02)] p-5 space-y-4">
      {/* CSS Keyframes for custom vector map animations */}
      <style>{`
        @keyframes routeFlow {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes mapPulse {
          0% {
            transform: scale(0.6);
            opacity: 0.9;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        .animate-route-flow {
          stroke-dasharray: 6, 4;
          animation: routeFlow 1.2s linear infinite;
        }
        .map-ripple {
          transform-origin: center;
          animation: mapPulse 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Map className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-gray-900 tracking-tight">Buscar Live Route Explorer</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">East Africa Map & Transit Grid</p>
          </div>
        </div>
        <Compass className="w-5 h-5 text-gray-300 animate-[spin_10s_linear_infinite]" />
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-7 gap-2 items-center bg-slate-50/50 p-2.5 rounded-2xl border border-gray-100/60">
        <div className="col-span-3">
          <CustomDropdown
            label="Origin"
            value={origin}
            options={Object.keys(cityCoords).sort()}
            onChange={(val) => {
              setOrigin(val);
              setApplied(false);
            }}
          />
        </div>

        <div className="col-span-1 flex justify-center pt-3">
          <button 
            onClick={handleSwap}
            className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 border border-gray-100 text-gray-500 shadow-sm flex items-center justify-center active:scale-90 transition-all cursor-pointer"
            title="Swap Origin and Destination"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="col-span-3">
          <CustomDropdown
            label="Destination"
            value={destination}
            options={Object.keys(cityCoords).sort()}
            onChange={(val) => {
              setDestination(val);
              setApplied(false);
            }}
            disabledOption={origin}
          />
        </div>
      </div>

      {/* Vector Stage */}
      <div className="relative bg-slate-50 border border-gray-100 rounded-2.5xl overflow-hidden aspect-[380/300] shadow-inner select-none">
        <svg 
          viewBox="0 0 380 300" 
          className="w-full h-full"
        >
          {/* Definitions for Gradients & Icons */}
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="shadowGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#36498c" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#36498c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid lines for aviation chart look */}
          <g stroke="#e2e8f0" strokeWidth="0.5" opacity="0.6">
            <line x1="50" y1="0" x2="50" y2="300" strokeDasharray="3 3" />
            <line x1="100" y1="0" x2="100" y2="300" strokeDasharray="3 3" />
            <line x1="150" y1="0" x2="150" y2="300" strokeDasharray="3 3" />
            <line x1="200" y1="0" x2="200" y2="300" strokeDasharray="3 3" />
            <line x1="250" y1="0" x2="250" y2="300" strokeDasharray="3 3" />
            <line x1="300" y1="0" x2="300" y2="300" strokeDasharray="3 3" />
            <line x1="350" y1="0" x2="350" y2="300" strokeDasharray="3 3" />

            <line x1="0" y1="50" x2="380" y2="50" strokeDasharray="3 3" />
            <line x1="0" y1="100" x2="380" y2="100" strokeDasharray="3 3" />
            <line x1="0" y1="150" x2="380" y2="150" strokeDasharray="3 3" />
            <line x1="0" y1="200" x2="380" y2="200" strokeDasharray="3 3" />
            <line x1="0" y1="250" x2="380" y2="250" strokeDasharray="3 3" />
          </g>

          {/* Decorative Compass Lines */}
          <circle cx="330" cy="50" r="18" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="330" y1="28" x2="330" y2="72" stroke="#94a3b8" strokeWidth="0.5" />
          <line x1="308" y1="50" x2="352" y2="50" stroke="#94a3b8" strokeWidth="0.5" />
          <text x="330" y="24" fontSize="6" fontWeight="bold" fill="#64748b" textAnchor="middle">N</text>

          {/* Indian Ocean Backdrop */}
          <path 
            d="M 335,180 L 320,210 L 305,230 L 290,250 L 270,270 L 255,290 L 245,320 L 380,320 L 380,180 Z" 
            fill="url(#oceanGrad)"
          />
          <text x="340" y="295" fontSize="7" fontWeight="bold" fill="#0284c7" opacity="0.4" letterSpacing="1" transform="rotate(-15 340 295)">INDIAN OCEAN</text>

          {/* Lake Victoria Backdrop */}
          <path 
            d="M 30,125 C 25,145 45,175 75,170 C 85,155 75,130 65,120 Z" 
            fill="url(#lakeGrad)" 
            stroke="#93c5fd" 
            strokeWidth="0.5"
          />
          <text x="48" y="148" fontSize="6" fontWeight="bold" fill="#2563eb" opacity="0.4">LAKE VICTORIA</text>

          {/* Mount Kenya Symbol */}
          <g transform="translate(205, 120)">
            <polygon points="0,-6 -7,6 7,6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
            <polygon points="0,-6 -3,6 0,6" fill="#e2e8f0" />
            <text x="0" y="11" fontSize="5" fontWeight="bold" fill="#94a3b8" textAnchor="middle">MT. KENYA</text>
          </g>

          {/* All Road/Route Interconnection Gridlines (Base Highway Network) */}
          <g stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
            {/* Main Spine highway */}
            <path d="M 35,110 L 115,105 L 160,140 L 190,180 L 285,260" strokeDasharray="2 2" />
            {/* Coastal highway */}
            <path d="M 285,260 L 295,250 L 305,240 L 315,225 L 335,195" strokeDasharray="2 2" />
            {/* Western connectors */}
            <line x1="75" y1="115" x2="115" y2="105" strokeDasharray="2 2" />
            <line x1="95" y1="135" x2="160" y2="140" strokeDasharray="2 2" />
            <line x1="90" y1="160" x2="125" y2="145" strokeDasharray="2 2" />
            <line x1="125" y1="145" x2="160" y2="140" strokeDasharray="2 2" />
            <line x1="115" y1="175" x2="125" y2="145" strokeDasharray="2 2" />
            {/* Mt Kenya Loop */}
            <path d="M 190,180 L 200,160 L 210,140 L 195,128 L 200,110 L 220,105 L 210,140" strokeDasharray="2 2" />
            {/* Eastern connector */}
            <line x1="190" y1="180" x2="235" y2="180" strokeDasharray="2 2" />
          </g>

          {/* Active Highlighted Route Path Line */}
          {svgPathString && (
            <>
              {/* Soft outer glow */}
              <path 
                d={svgPathString} 
                fill="none" 
                stroke="#36498c" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                opacity="0.15"
              />
              {/* Sharp flow trace */}
              <path 
                d={svgPathString} 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="animate-route-flow"
              />
            </>
          )}

          {/* Hardware Accelerated Pulse & Pins */}
          {/* Origin Pulse */}
          <g transform={`translate(${originCoords.x}, ${originCoords.y})`}>
            <circle r="9" fill="#10b981" opacity="0.3" className="map-ripple" />
            <circle r="4" fill="#10b981" stroke="#white" strokeWidth="1" className="shadow-xs" />
          </g>

          {/* Destination Pulse */}
          <g transform={`translate(${destCoords.x}, ${destCoords.y})`}>
            <circle r="9" fill="#ef4444" opacity="0.3" className="map-ripple" />
            <circle r="4" fill="#ef4444" stroke="#white" strokeWidth="1" className="shadow-xs" />
          </g>

          {/* Render All Cities Map Nodes */}
          {Object.entries(cityCoords).map(([name, coords]) => {
            const isSelected = name === resolveCityName(origin) || name === resolveCityName(destination);
            const anchor = getLabelAnchor(coords.labelOffset);

            return (
              <g key={name}>
                {/* Visual Circle for each stop */}
                {!isSelected && (
                  <circle 
                    cx={coords.x} 
                    cy={coords.y} 
                    r="2.5" 
                    fill="#475569" 
                    stroke="#ffffff" 
                    strokeWidth="0.5" 
                    opacity="0.8"
                  />
                )}
                {/* Legible Map Labels with dropshadow protection */}
                <text 
                  cx={coords.x} 
                  cy={coords.y}
                  x={coords.x} 
                  y={coords.y}
                  dx={anchor.dx}
                  dy={anchor.dy}
                  textAnchor={anchor.textAnchor}
                  fontSize="7" 
                  fontWeight={isSelected ? "900" : "600"} 
                  fill={isSelected ? "#1e293b" : "#64748b"}
                  className="transition-all duration-300 pointer-events-none"
                  style={{
                    textShadow: '1px 1px 1px rgba(255,255,255,0.9), -1px -1px 1px rgba(255,255,255,0.9), 1px -1px 1px rgba(255,255,255,0.9), -1px 1px 1px rgba(255,255,255,0.9)'
                  }}
                >
                  {name}
                </text>
              </g>
            );
          })}

          {/* Self-contained animated Bus marker along the active path */}
          {svgPathString && (
            <g>
              <circle r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" className="shadow-lg" />
              {/* Tiny pointer arrow inside */}
              <polygon points="-2,-1.5 2,0 -2,1.5" fill="white" />
              <animateMotion 
                dur="7s" 
                repeatCount="indefinite" 
                path={svgPathString} 
                rotate="auto"
              />
            </g>
          )}
        </svg>

        {/* Floating Route Distance/Duration Card Overlay */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs py-2 px-3 rounded-xl border border-gray-100/80 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black text-gray-700">{origin}</span>
            <ArrowRight className="w-3 h-3 text-gray-400" />
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[10px] font-black text-red-600">{destination}</span>
          </div>
          <div className="text-[9px] font-extrabold text-[#36498c] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
            Express Highway
          </div>
        </div>
      </div>

      {/* Booking Actions */}
      <div className="flex gap-2">
        <button
          onClick={applyRouteToForm}
          className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95 ${
            applied 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-[#36498c] text-white hover:bg-[#2c3d79]'
          }`}
        >
          {applied ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              Applied to Search Form!
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 rotate-45" />
              Book This Route
            </>
          )}
        </button>
      </div>
    </div>
  );
}
