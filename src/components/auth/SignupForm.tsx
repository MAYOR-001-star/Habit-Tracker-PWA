'use client';

import React, { useState } from 'react';

interface SignupFormProps {
  onSignup: (email: string, password: string) => void;
  error?: string | null;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSignup, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="signup-email"
          type="email"
          data-testid="auth-signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="signup-password" title="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="signup-password"
          type="password"
          data-testid="auth-signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <button
        type="submit"
        data-testid="auth-signup-submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
