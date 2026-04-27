import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '../../src/lib/habits';
import { Habit } from '../../src/types/habit';

describe('toggleHabitCompletion', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'u1',
    name: 'Habit 1',
    description: 'Desc 1',
    frequency: 'daily',
    createdAt: '2023-10-01',
    completions: ['2023-10-01'],
  };

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(mockHabit, '2023-10-02');
    expect(result.completions).toContain('2023-10-02');
    expect(result.completions.length).toBe(2);
  });

  it('removes a completion date when the date already exists', () => {
    const result = toggleHabitCompletion(mockHabit, '2023-10-01');
    expect(result.completions).not.toContain('2023-10-01');
    expect(result.completions.length).toBe(0);
  });

  it('does not mutate the original habit object', () => {
    const originalCompletions = [...mockHabit.completions];
    toggleHabitCompletion(mockHabit, '2023-10-02');
    expect(mockHabit.completions).toEqual(originalCompletions);
  });

  it('does not return duplicate completion dates', () => {
    // Note: our toggleHabitCompletion implementation uses Set to ensure uniqueness
    const result = toggleHabitCompletion(mockHabit, '2023-10-02');
    const uniqueCompletions = Array.from(new Set(result.completions));
    expect(result.completions.length).toBe(uniqueCompletions.length);
  });
});
