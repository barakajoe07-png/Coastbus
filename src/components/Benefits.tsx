import { ShieldCheck, Clock, BookOpen, Wallet } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    { 
      icon: ShieldCheck, 
      title: 'Safety First', 
      desc: 'Professional drivers and GPS tracked buses.',
      iconColor: 'text-[#8b5a2b]',
      bg: 'bg-stone-100'
    },
    { 
      icon: Clock, 
      title: 'Punctuality', 
      desc: 'We value your time and stick to schedules.',
      iconColor: 'text-orange-400',
      bg: 'bg-orange-100'
    },
    { 
      icon: BookOpen, 
      title: 'Easy Booking', 
      desc: 'Book and manage tickets effortlessly online.',
      iconColor: 'text-red-600',
      bg: 'bg-red-100'
    },
    { 
      icon: Wallet, 
      title: 'Affordable Rates', 
      desc: 'Competitive pricing without compromising quality.',
      iconColor: 'text-[#6b4c3a]',
      bg: 'bg-stone-100'
    },
  ];

  return (
    <div className="px-5 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Benefits</h2>
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
