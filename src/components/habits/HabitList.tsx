'use client';

import React from 'react';
import { Habit } from '../../types/habit';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export const HabitList: React.FC<HabitListProps> = ({ habits, onToggle, onEdit, onDelete }) => {
  if (habits.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4" 
        data-testid="empty-state"
      >
        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center p-5 opacity-20">
          <img src="/icons/habit-logo.png" alt="Empty" className="w-full h-full object-contain grayscale" />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-bold text-slate-900 dark:text-white">No habits found</p>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs">
            Start your productivity journey by creating your first habit.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HabitList;
