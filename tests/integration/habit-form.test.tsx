import { render, screen } from '@testing-library/react';
import HabitForm from '../../src/app/components/habits/HabitForm';

describe('Habit Form', () => {
  it('should render the habit form', () => {
    render(<HabitForm />);
    expect(screen.getByPlaceholderText(/e.g. Morning Run/i)).toBeDefined();
  });
});
