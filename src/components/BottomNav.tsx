import { Home, Printer, HelpCircle, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] text-white border-t border-gray-800 flex z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <button onClick={() => setActiveTab('home')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 pt-3 pb-6 transition-colors ${activeTab === 'home' ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-white'}`}>
        <Home className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Home</span>
      </button>
      <button onClick={() => setActiveTab('print')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 pt-3 pb-6 transition-colors ${activeTab === 'print' ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-white'}`}>
        <Printer className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Print Ticket</span>
      </button>
      <button onClick={() => setActiveTab('help')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 pt-3 pb-6 transition-colors ${activeTab === 'help' ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-white'}`}>
        <HelpCircle className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Help</span>
      </button>
      <button onClick={() => setActiveTab('account')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 pt-3 pb-6 transition-colors ${activeTab === 'account' ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-white'}`}>
        <User className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Account</span>
      </button>
    </div>
  );
}
