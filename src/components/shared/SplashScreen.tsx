import React from 'react';

export const SplashScreen: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 z-50"
      data-testid="splash-screen"
    >
      <div className="relative">
        <div className="absolute inset-0 scale-150 animate-pulse-slow opacity-20 bg-white rounded-full blur-2xl"></div>
        <div className="absolute inset-0 scale-125 animate-pulse-slow opacity-30 bg-white rounded-full blur-xl"></div>
        
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl transform transition-all duration-1000 scale-100">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform overflow-hidden p-2">
              <img src="/icons/habit-logo.png" alt="Habit Tracker Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Habit Tracker
            </h1>
            <div className="h-1 w-12 bg-white/40 rounded-full"></div>
            <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
              Build your streak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
