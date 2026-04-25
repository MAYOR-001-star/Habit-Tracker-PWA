import { isValidEmail, isNonEmpty } from '../../src/app/validators';

describe('validators', () => {
  it('should validate emails correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  it('should validate non-empty strings', () => {
    expect(isNonEmpty('  ')).toBe(false);
    expect(isNonEmpty('text')).toBe(true);
  });
});
