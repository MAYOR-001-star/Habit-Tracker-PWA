import React from 'react';

export const SplashScreen: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      data-testid="splash-screen"
    >
      <h1 className="text-4xl font-bold text-blue-600">Habit Tracker</h1>
    </div>
  );
};

export default SplashScreen;
