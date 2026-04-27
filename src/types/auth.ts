export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
};

export type Session = {
  userId: string;
  email: string;
  username?: string;
};
