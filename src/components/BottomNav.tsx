import { Home, Printer, HelpCircle, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-all relative ${activeTab === 'home' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
        >
          <Home className="w-[1.2rem] h-[1.2rem]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Home</span>
          {activeTab === 'home' && <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full" />}
        </button>
        
        <button 
          onClick={() => setActiveTab('print')} 
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-all relative ${activeTab === 'print' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
        >
          <Printer className="w-[1.2rem] h-[1.2rem]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Print</span>
          {activeTab === 'print' && <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full" />}
        </button>
        
        <button 
          onClick={() => setActiveTab('help')} 
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-all relative ${activeTab === 'help' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
        >
          <HelpCircle className="w-[1.2rem] h-[1.2rem]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Help</span>
          {activeTab === 'help' && <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full" />}
        </button>
        
        <button 
          onClick={() => setActiveTab('account')} 
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-all relative ${activeTab === 'account' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
        >
          <User className="w-[1.2rem] h-[1.2rem]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">Account</span>
          {activeTab === 'account' && <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full" />}
        </button>
      </div>
    </div>
  );
}
