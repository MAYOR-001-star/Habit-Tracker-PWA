'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '../../components/auth/LoginForm';
import { storage } from '../../lib/storage';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('signup') === 'success') {
      setSuccess('Account created! Please log in to continue.');
    }
  }, [searchParams]);

  const handleLogin = (email: string, pass: string) => {
    const users = storage.getUsers();
    const user = users.find((u) => u.email === email && u.password === pass);

    if (user) {
      storage.saveSession({ userId: user.id, email: user.email });
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
      setSuccess(null);
    }
  };

  return (
    <div className="py-10 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 dark:opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 mb-6 transform rotate-3 p-3">
            <img src="/icons/habit-logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Continue your journey to better habits</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-slate-100 dark:border-slate-800">
          {success && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-2">
              <img src="/icons/check.svg" alt="Success" className="w-5 h-5 text-green-500" />
              <p className="text-green-500 text-sm font-medium">{success}</p>
            </div>
          )}
          <LoginForm onLogin={handleLogin} error={error} />
        </div>

        <p className="mt-8 text-center text-slate-600 dark:text-slate-400 font-medium">
          New here?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-500 underline underline-offset-4 decoration-2 decoration-blue-600/30 hover:decoration-blue-600 transition-all">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
