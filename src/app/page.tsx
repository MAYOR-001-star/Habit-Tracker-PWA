'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '../components/shared/SplashScreen';
import { storage } from '../lib/storage';

export default function Home() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Show splash for at least 2 seconds for premium feel
    const timer = setTimeout(() => {
      const session = storage.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  // We keep showing the splash screen until we are ready to unmount this page
  // and the router has started navigating.
  return <SplashScreen />;
}
