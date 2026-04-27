'use client';

import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          data-testid="auth-login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password" title="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          data-testid="auth-login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <button
        type="submit"
        data-testid="auth-login-submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
