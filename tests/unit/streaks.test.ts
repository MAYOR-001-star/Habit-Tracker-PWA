import { calculateStreak } from '../../src/app/streaks';

describe('streaks utility', () => {
  it('should return 0 for empty dates', () => {
    expect(calculateStreak([])).toBe(0);
  });

  it('should return the correct count', () => {
    expect(calculateStreak(['2024-01-01', '2024-01-02'])).toBe(2);
  });
});
