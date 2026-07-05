import { Home, Printer, HelpCircle, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white border-t border-gray-800 flex justify-around items-center pt-2 pb-6 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
        <Home className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Home</span>
      </button>
      <button onClick={() => setActiveTab('print')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'print' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
        <Printer className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Print Ticket</span>
      </button>
      <button onClick={() => setActiveTab('help')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'help' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
        <HelpCircle className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Help</span>
      </button>
      <button onClick={() => setActiveTab('account')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'account' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
        <User className="w-[1.35rem] h-[1.35rem]" />
        <span className="text-[10px] font-medium tracking-wide">Account</span>
      </button>
    </div>
  );
}
