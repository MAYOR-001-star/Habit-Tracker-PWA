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
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },
  getSession: (): Session | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(KEYS.SESSION);
    return data ? JSON.parse(data) : null;
  },
  saveSession: (session: Session | null) => {
    if (typeof window === 'undefined') return;
    if (session === null) {
      localStorage.removeItem(KEYS.SESSION);
    } else {
      localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
    }
  },
  getHabits: (): Habit[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.HABITS);
    return data ? JSON.parse(data) : [];
  },
  saveHabits: (habits: Habit[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.HABITS, JSON.stringify(habits));
  },
};
