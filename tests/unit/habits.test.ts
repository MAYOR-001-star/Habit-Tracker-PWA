import { getHabits } from '../../src/app/habits';

describe('habits library', () => {
  it('should return an empty list initially', () => {
    expect(getHabits()).toEqual([]);
  });
});
