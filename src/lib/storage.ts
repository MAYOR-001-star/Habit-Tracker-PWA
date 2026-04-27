import { User, Session } from '../types/auth';
import { Habit } from '../types/habit';

const KEYS = {
  USERS: 'habit-tracker-users',
  SESSION: 'habit-tracker-session',
  HABITS: 'habit-tracker-habits',
};

export const storage = {
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading users from storage:', e);
      return [];
    }
  },
  saveUsers: (users: User[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to storage:', e);
    }
  },
  getSession: (): Session | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading session from storage:', e);
      return null;
    }
  },
  saveSession: (session: Session | null) => {
    if (typeof window === 'undefined') return;
    try {
      if (session === null) {
        localStorage.removeItem(KEYS.SESSION);
      } else {
        localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
      }
    } catch (e) {
      console.error('Error saving session to storage:', e);
    }
  },
  getHabits: (): Habit[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(KEYS.HABITS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading habits from storage:', e);
      return [];
    }
  },
  saveHabits: (habits: Habit[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(KEYS.HABITS, JSON.stringify(habits));
    } catch (e) {
      console.error('Error saving habits to storage:', e);
    }
  },
};
