'use client';

import React from 'react';
import { Habit } from '../../types/habit';
import { getHabitSlug } from '../../lib/slug';
import { calculateCurrentStreak } from '../../lib/streaks';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onEdit, onDelete }) => {
  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);
  const streak = calculateCurrentStreak(habit.completions, today);

  return (
    <div 
      className="p-4 border rounded-lg shadow-sm flex items-center justify-between"
      data-testid={`habit-card-${slug}`}
    >
      <div>
        <h3 className="font-bold text-lg">{habit.name}</h3>
        <p className="text-sm text-gray-600">{habit.description}</p>
        <div className="text-sm font-medium" data-testid={`habit-streak-${slug}`}>
          Streak: {streak} days
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onToggle(habit.id)}
          data-testid={`habit-complete-${slug}`}
          className={`px-3 py-1 rounded ${isCompletedToday ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          {isCompletedToday ? 'Done' : 'Check'}
        </button>
        <button
          onClick={() => onEdit(habit)}
          data-testid={`habit-edit-${slug}`}
          className="px-3 py-1 bg-blue-100 text-blue-600 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          data-testid={`habit-delete-${slug}`}
          className="px-3 py-1 bg-red-100 text-red-600 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
