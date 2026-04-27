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

    // Show splash for 1.5s then redirect
    const timer = setTimeout(() => {
      router.push(target);
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
