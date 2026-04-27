'use client';

import { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';

export const AppSplashScreen = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Use sessionStorage to show splash only once per session
    const hasShown = sessionStorage.getItem('habit-tracker-splash-shown');
    if (!hasShown) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('habit-tracker-splash-shown', 'true');
      }, 1200); // Reduced to 1.2s for faster feel
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {show && <SplashScreen />}
      {children}
    </>
  );
};
