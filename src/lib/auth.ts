import { storage } from './storage';
import { User, Session } from '../types/auth';

export const loginUser = (email: string, pass: string): Session | null => {
  const users = storage.getUsers();
  const user = users.find((u) => u.email === email && u.password === pass);
  
  if (user) {
    const session: Session = { userId: user.id, email: user.email, username: user.username };
    storage.saveSession(session);
    return session;
  }
  return null;
};

export const logoutUser = () => {
  storage.saveSession(null);
};

export const getCurrentUser = (): Session | null => {
  return storage.getSession();
};
