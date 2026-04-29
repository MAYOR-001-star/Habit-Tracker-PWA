import { describe, it, expect, beforeEach } from 'vitest';
import { loginUser, logoutUser, getCurrentUser } from '../../src/lib/auth';
import { storage } from '../../src/lib/storage';

describe('auth utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loginUser returns a session when credentials match', () => {
    storage.saveUsers([{ id: 'u1', email: 'test@example.com', password: 'pass123', createdAt: '2023-01-01' }]);
    const session = loginUser('test@example.com', 'pass123');
    expect(session).not.toBeNull();
    expect(session?.email).toBe('test@example.com');
    expect(session?.userId).toBe('u1');
  });

  it('loginUser returns null for wrong credentials', () => {
    storage.saveUsers([{ id: 'u1', email: 'test@example.com', password: 'pass123', createdAt: '2023-01-01' }]);
    const session = loginUser('test@example.com', 'wrongpass');
    expect(session).toBeNull();
  });

  it('loginUser saves the session to storage', () => {
    storage.saveUsers([{ id: 'u1', email: 'test@example.com', password: 'pass123', createdAt: '2023-01-01' }]);
    loginUser('test@example.com', 'pass123');
    const stored = storage.getSession();
    expect(stored?.email).toBe('test@example.com');
  });

  it('logoutUser removes the session from storage', () => {
    storage.saveSession({ userId: 'u1', email: 'test@example.com' });
    logoutUser();
    expect(storage.getSession()).toBeNull();
  });

  it('getCurrentUser returns the active session', () => {
    storage.saveSession({ userId: 'u1', email: 'test@example.com' });
    const session = getCurrentUser();
    expect(session?.userId).toBe('u1');
  });

  it('getCurrentUser returns null when no session exists', () => {
    const session = getCurrentUser();
    expect(session).toBeNull();
  });
});
