import { ShieldCheck, Clock, BookOpen, Wallet } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    { 
      icon: Wallet, 
      title: 'Save', 
      desc: 'Pay less when using our new Mobile App. You can save up to 25% of your Promo Cash...',
      iconColor: 'text-[#e62933]',
      bg: 'bg-[#ffebee]'
    },
    { 
      icon: Clock, 
      title: 'Multiple Routes', 
      desc: 'We cover multiple routes and the widest connectivity in Kenya.',
      iconColor: 'text-[#36498c]',
      bg: 'bg-[#eef2ff]'
    },
    { 
      icon: ShieldCheck, 
      title: 'Earn Credits', 
      desc: 'Receive more credit during promotional periods which will be added into your Promo...',
      iconColor: 'text-[#8b5a2b]',
      bg: 'bg-[#fdf6e3]'
    },
    { 
      icon: BookOpen, 
      title: 'Parcel Delivery', 
      desc: 'We Deliver parcels in all major towns in the country.',
      iconColor: 'text-[#e8b917]',
      bg: 'bg-[#fffde7]'
    },
    { 
      icon: BookOpen, 
      title: 'Fleet', 
      desc: 'Our Fleet has VIP Treatment, WiFi onboard Power Outlets and Extra Legroom',
      iconColor: 'text-gray-800',
      bg: 'bg-gray-100'
    },
  ];

  return (
    <div className="px-5 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Why Us</h2>
      <p className="text-gray-500 text-sm mb-6">Experience the best transport service in the region</p>
      
      <div className="flex flex-col gap-4">
        {benefits.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
                <Icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
