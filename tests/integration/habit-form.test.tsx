import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '../../src/app/dashboard/page';
import { storage } from '../../src/lib/storage';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear();
    storage.saveSession({ userId: 'u1', email: 'test@example.com' });
  });

  it('shows a validation error when habit name is empty', async () => {
    render(<DashboardPage />);
    
    fireEvent.click(screen.getByTestId('create-habit-button'));
    fireEvent.click(screen.getByTestId('habit-save-button'));

    expect(await screen.findByText('Habit name is required')).toBeDefined();
  });

  it('creates a new habit and renders it in the list', async () => {
    render(<DashboardPage />);
    
    fireEvent.click(screen.getByTestId('create-habit-button'));
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'Drink Water' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));

    expect(await screen.findByTestId('habit-card-drink-water')).toBeDefined();
  });

  it('edits an existing habit and preserves immutable fields', async () => {
    const habit = {
      id: 'h1',
      userId: 'u1',
      name: 'Old Name',
      description: '',
      frequency: 'daily' as const,
      createdAt: '2023-01-01',
      completions: ['2023-01-01'],
    };
    storage.saveHabits([habit]);

    render(<DashboardPage />);
    
    fireEvent.click(screen.getByTestId('habit-edit-old-name'));
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));

    await waitFor(() => {
      const updatedHabits = storage.getHabits();
      expect(updatedHabits[0].name).toBe('New Name');
      expect(updatedHabits[0].id).toBe('h1');
      expect(updatedHabits[0].createdAt).toBe('2023-01-01');
    });
  });

  it('deletes a habit only after explicit confirmation', async () => {
    const habit = {
      id: 'h1',
      userId: 'u1',
      name: 'To Delete',
      description: '',
      frequency: 'daily' as const,
      createdAt: '2023-01-01',
      completions: [],
    };
    storage.saveHabits([habit]);

    render(<DashboardPage />);
    
    fireEvent.click(screen.getByTestId('habit-delete-to-delete'));
    
    // Should still be there before confirmation
    expect(screen.getByTestId('habit-card-to-delete')).toBeDefined();
    
    fireEvent.click(screen.getByTestId('confirm-delete-button'));
    
    await waitFor(() => {
      expect(screen.queryByTestId('habit-card-to-delete')).toBeNull();
    });
  });

  it('toggles completion and updates the streak display', async () => {
    const today = new Date().toISOString().split('T')[0];
    const habit = {
      id: 'h1',
      userId: 'u1',
      name: 'Streak Habit',
      description: '',
      frequency: 'daily' as const,
      createdAt: today,
      completions: [],
    };
    storage.saveHabits([habit]);

    render(<DashboardPage />);
    
    const streakEl = screen.getByTestId('habit-streak-streak-habit');
    expect(streakEl.textContent).toContain('0 days');
    
    fireEvent.click(screen.getByTestId('habit-complete-streak-habit'));
    
    await waitFor(() => {
      expect(streakEl.textContent).toContain('1 days');
    });
  });
});
