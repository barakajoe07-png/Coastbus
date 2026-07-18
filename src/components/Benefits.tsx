import { ShieldCheck, Clock, BookOpen, Wallet, Sparkles } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    { 
      icon: Wallet, 
      title: 'Massive Promo Savings', 
      desc: 'Pay less when booking directly. Save up to 25% instantly on select morning and evening coach schedules.',
      iconColor: 'text-emerald-600',
      bg: 'bg-emerald-500/10'
    },
    { 
      icon: Clock, 
      title: 'Widest Network Connectivity', 
      desc: 'We offer extensive daily scheduled departures linking major cities across Kenya and Uganda.',
      iconColor: 'text-[#36498c]',
      bg: 'bg-[#36498c]/10'
    },
    { 
      icon: ShieldCheck, 
      title: 'Loyalty Credit Rewards', 
      desc: 'Earn credit points on every trip. Redeem accumulated travel credits to book free future tickets.',
      iconColor: 'text-amber-700',
      bg: 'bg-amber-600/15'
    },
    { 
      icon: Sparkles, 
      title: 'First-Class Comfort Cabin', 
      desc: 'All VIP and regular express buses include high-speed Wi-Fi, individual power ports, and deep-reclining seats.',
      iconColor: 'text-red-600',
      bg: 'bg-red-500/10'
    },
  ];

  return (
    <div className="px-2 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1 px-1.5 tracking-tight">Why Choose Buscar</h2>
      <p className="text-gray-500 text-xs mb-5 px-1.5 font-medium">Experience first-class road travel with East Africa's premier express operator</p>
      
      <div className="flex flex-col gap-3 px-0.5">
        {benefits.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-2xl border border-white/80 bg-white/40 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.015)] hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.bg} group-hover:scale-105 transition-transform`}>
                <Icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-gray-900 text-sm tracking-tight mb-0.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
