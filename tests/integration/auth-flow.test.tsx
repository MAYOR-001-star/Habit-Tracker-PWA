import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from '../../src/app/signup/page';
import LoginPage from '../../src/app/login/page';
import { storage } from '../../src/lib/storage';
import React from 'react';

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('auth flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('submits the signup form and creates a session', async () => {
    render(<SignupPage />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-signup-submit'));

    await waitFor(() => {
      const session = storage.getSession();
      expect(session?.email).toBe('test@example.com');
    });
  });

  it('shows an error for duplicate signup email', async () => {
    storage.saveUsers([{ id: '1', email: 'test@example.com', password: '123', createdAt: '' }]);
    
    render(<SignupPage />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-signup-submit'));

    expect(await screen.findByText('User already exists')).toBeDefined();
  });

  it('submits the login form and stores the active session', async () => {
    storage.saveUsers([{ id: '1', email: 'test@example.com', password: 'password123', createdAt: '' }]);
    
    render(<LoginPage />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));

    await waitFor(() => {
      const session = storage.getSession();
      expect(session?.email).toBe('test@example.com');
    });
  });

  it('shows an error for invalid login credentials', async () => {
    render(<LoginPage />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));

    expect(await screen.findByText('Invalid email or password')).toBeDefined();
  });
});
