import { render, screen } from '@testing-library/react';
import LoginForm from '../../src/app/components/auth/LoginForm';

describe('Auth Flow', () => {
  it('should render the login form', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeDefined();
  });
});
