'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignupForm } from '../../components/auth/SignupForm';
import { storage } from '../../lib/storage';

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSignup = (email: string, pass: string) => {
    const users = storage.getUsers();
    if (users.some((u) => u.email === email)) {
      setError('User already exists');
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password: pass,
      createdAt: new Date().toISOString(),
    };

    storage.saveUsers([...users, newUser]);
    storage.saveSession({ userId: newUser.id, email: newUser.email });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 dark:opacity-20 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 mb-6 transform -rotate-3">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Join the Club</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Start building your streak today</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-100 dark:border-slate-800">
          <SignupForm onSignup={handleSignup} error={error} />
        </div>

        <p className="mt-8 text-center text-slate-600 dark:text-slate-400 font-medium">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-500 underline underline-offset-4 decoration-2 decoration-indigo-600/30 hover:decoration-indigo-600 transition-all">Sign in here</a>
        </p>
      </div>
    </div>
  );
}
