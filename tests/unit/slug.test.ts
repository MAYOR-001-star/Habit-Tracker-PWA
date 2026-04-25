import { createSlug } from '../../src/app/slug';

describe('slug utility', () => {
  it('should convert text to lowercase and replace spaces with hyphens', () => {
    expect(createSlug('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(createSlug('Hello @World!')).toBe('hello-world');
  });
});
