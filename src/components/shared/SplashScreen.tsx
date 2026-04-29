'use client';

import React, { useEffect, useState } from 'react';
import { storage } from '../../lib/storage';

export const SplashScreen: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    const session = storage.getSession();
    if (session) {
      setIsLoggedIn(true);
    }

    // If still here after 3 seconds, show a manual button
    const timer = setTimeout(() => {
      setShowManual(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 z-[9999]"
      data-testid="splash-screen"
    >
      <div className="relative transform transition-all duration-700 scale-100 opacity-100">
        <div className="absolute inset-0 scale-150 animate-pulse-slow opacity-20 bg-white rounded-full blur-2xl"></div>
        <div className="absolute inset-0 scale-125 animate-pulse-slow opacity-30 bg-white rounded-full blur-xl"></div>
        
        <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 shadow-2xl flex flex-col items-center space-y-6">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 p-3 overflow-hidden">
            <img src="/icons/habit-logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Habit Tracker
            </h1>
            <p className="text-white/60 font-medium tracking-wide uppercase text-xs">
              {isLoggedIn ? 'Loading your progress' : 'Build your streak'}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 pt-2">
            <div className="h-1.5 w-16 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">
              Initializing
            </p>
          </div>

          {showManual && (
            <div className="pt-4 animate-in fade-in zoom-in duration-500">
              <a 
                href={isLoggedIn ? '/dashboard' : '/login'} 
                className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
              >
                Enter Manually
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
