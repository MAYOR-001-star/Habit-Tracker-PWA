export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isNonEmpty = (text: string) => {
  return text.trim().length > 0;
};
