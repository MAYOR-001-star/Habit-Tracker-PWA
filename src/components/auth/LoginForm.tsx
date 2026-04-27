'use client';

import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-2" role="alert">
          <img src="/icons/error.svg" alt="Error" className="w-5 h-5 text-red-500" />
          <p className="text-red-500 text-sm font-medium">{error}</p>
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Email Address</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200">
            <img src="/icons/mail.svg" alt="Mail" className="w-5 h-5 opacity-50 group-focus-within:opacity-100 group-focus-within:indigo-filter" />
          </div>
          <input
            id="email"
            type="email"
            data-testid="auth-login-email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="password" title="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200">
            <img src="/icons/lock.svg" alt="Lock" className="w-5 h-5 opacity-50 group-focus-within:opacity-100 group-focus-within:indigo-filter" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            data-testid="auth-login-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center opacity-40 hover:opacity-100 transition-opacity"
          >
            <img src={showPassword ? "/icons/eye-off.svg" : "/icons/eye.svg"} alt="Toggle" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <button
        type="submit"
        data-testid="auth-login-submit"
        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
