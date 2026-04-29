import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../../src/lib/storage';
import { User, Session } from '../../src/types/auth';
import { Habit } from '../../src/types/habit';

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockUser: User = {
    id: 'u1',
    email: 'test@example.com',
    password: 'pass123',
    createdAt: '2023-01-01',
  };

  const mockHabit: Habit = {
    id: 'h1',
    userId: 'u1',
    name: 'Drink Water',
    description: 'Stay hydrated',
    frequency: 'daily',
    createdAt: '2023-01-01',
    completions: [],
  };

  it('getUsers returns empty array when no users saved', () => {
    expect(storage.getUsers()).toEqual([]);
  });

  it('saveUsers and getUsers round-trips correctly', () => {
    storage.saveUsers([mockUser]);
    const users = storage.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('test@example.com');
  });

  it('getSession returns null when no session saved', () => {
    expect(storage.getSession()).toBeNull();
  });

  it('saveSession and getSession round-trips correctly', () => {
    const session: Session = { userId: 'u1', email: 'test@example.com' };
    storage.saveSession(session);
    expect(storage.getSession()).toEqual(session);
  });

  it('saveSession with null removes the session', () => {
    storage.saveSession({ userId: 'u1', email: 'test@example.com' });
    storage.saveSession(null);
    expect(storage.getSession()).toBeNull();
  });

  it('getHabits returns empty array when no habits saved', () => {
    expect(storage.getHabits()).toEqual([]);
  });

  it('saveHabits and getHabits round-trips correctly', () => {
    storage.saveHabits([mockHabit]);
    const habits = storage.getHabits();
    expect(habits).toHaveLength(1);
    expect(habits[0].name).toBe('Drink Water');
  });
});
