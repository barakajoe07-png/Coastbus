import { Wifi, Plug, Armchair, Star } from 'lucide-react';

export default function Amenities() {
  const amenities = [
    { icon: Wifi, label: 'Free Wi-Fi', bg: 'bg-gray-100', iconColor: 'text-black', border: 'border-gray-200' },
    { icon: Plug, label: 'Power Outlets', bg: 'bg-teal-50/50', iconColor: 'text-[#ff6b4a]', border: 'border-teal-100' },
    { icon: Armchair, label: 'Extra Legroom', bg: 'bg-orange-50/50', iconColor: 'text-[#ff8a66]', border: 'border-orange-100' },
    { icon: Star, label: 'VIP Seating', bg: 'bg-purple-50/50', iconColor: 'text-red-500', border: 'border-purple-100' },
  ];

  return (
    <div className="px-5 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Amenities</h2>
      <p className="text-gray-500 text-sm mb-6">Travel in comfort with our premium facilities</p>
      
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className={`${item.bg} ${item.border} rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 border`}>
              <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm ${item.iconColor}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-900 text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
