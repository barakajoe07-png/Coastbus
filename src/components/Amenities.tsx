import { Wifi, Plug, Armchair, Star } from 'lucide-react';

export default function Amenities() {
  const amenities = [
    { icon: Wifi, label: 'Free Wi-Fi', bg: 'bg-white/50', iconBg: 'bg-[#36498c]/10', iconColor: 'text-[#36498c]', border: 'border-white/80' },
    { icon: Plug, label: 'Power Outlets', bg: 'bg-white/50', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-600', border: 'border-white/80' },
    { icon: Armchair, label: 'Extra Legroom', bg: 'bg-white/50', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-600', border: 'border-white/80' },
    { icon: Star, label: 'VIP Seating', bg: 'bg-white/50', iconBg: 'bg-red-500/10', iconColor: 'text-red-500', border: 'border-white/80' },
  ];

  return (
    <div className="px-2 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1 px-1.5 tracking-tight">Onboard Amenities</h2>
      <p className="text-gray-500 text-xs mb-5 px-1.5 font-medium">Travel in high comfort with our top-tier cabin facilities</p>
      
      <div className="grid grid-cols-2 gap-3 px-0.5">
        {amenities.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className={`${item.bg} ${item.border} rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 border backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:scale-[1.02] transition-transform`}
            >
              <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center ${item.iconColor} shadow-inner`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-gray-800 text-xs uppercase tracking-wider">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
