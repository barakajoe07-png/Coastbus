import { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Account({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <div className="p-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
          <User className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-1">Welcome Back!</h2>
        <p className="text-gray-500 mb-8 text-sm">guest@example.com</p>
        
        <div className="space-y-3">
          <button onClick={() => setActiveTab('home')} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-full transition-colors text-lg shadow-md">
            Book a Ticket
          </button>
          <button onClick={() => setIsLoggedIn(false)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-full transition-colors text-lg shadow-sm">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-gray-500 text-sm">
          {isLogin ? 'Login to manage your bookings' : 'Sign up for faster bookings'}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {!isLogin && (
          <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
            <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400 shrink-0" />
              <input type="text" placeholder="John Doe" className="w-full font-bold text-gray-900 outline-none bg-transparent text-base" />
            </div>
          </div>
        )}
        
        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />
            <input type="email" placeholder="you@example.com" className="w-full font-bold text-gray-900 outline-none bg-transparent text-base" />
          </div>
        </div>

        <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
          <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-gray-400 shrink-0" />
            <input type="password" placeholder="••••••••" className="w-full font-bold text-gray-900 outline-none bg-transparent text-base" />
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsLoggedIn(true)}
        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-full transition-colors text-lg shadow-md mb-4"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>

      <button 
        onClick={() => setActiveTab('home')}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-full transition-colors text-lg shadow-sm flex items-center justify-center gap-2 mb-6"
      >
        Continue as Guest <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-center text-sm text-gray-500">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-black hover:underline">
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  );
}
