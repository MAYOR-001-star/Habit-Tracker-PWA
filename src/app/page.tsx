'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '../components/shared/SplashScreen';
import { storage } from '../lib/storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Determine target based on session
    const session = storage.getSession();
    const target = session ? '/dashboard' : '/login';

    // Show splash for 1.2s then redirect
    // Using replace to avoid having the splash screen in history
    const timer = setTimeout(() => {
      console.log('Redirecting to:', target);
      router.replace(target);
    }, 1200);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
