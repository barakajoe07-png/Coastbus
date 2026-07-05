import { Printer, Search } from 'lucide-react';

export default function PrintTicket() {
  return (
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
        <Printer className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Print Ticket</h2>
      <p className="text-gray-500 mb-8 text-sm">Enter your booking reference or ticket number to print your ticket.</p>
      
      <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all mb-4 text-left">
        <label className="block text-xs font-medium text-gray-500 mb-1">Ticket / Reference Number</label>
        <div className="flex items-center gap-3 relative">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input 
            type="text" 
            placeholder="e.g. BKT-123456"
            className="w-full font-bold text-gray-900 outline-none bg-transparent text-base"
          />
        </div>
      </div>
      
      <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-full transition-colors text-lg shadow-md">
        Retrieve Ticket
      </button>
    </div>
  );
}
