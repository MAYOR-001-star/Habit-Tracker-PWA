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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <SignupForm onSignup={handleSignup} error={error} />
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}
