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
      className={`group relative p-6 rounded-[2rem] transition-all duration-300 border ${
        isCompletedToday 
        ? 'bg-blue-600/5 dark:bg-blue-500/10 border-blue-500/20 shadow-lg shadow-blue-500/5' 
        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5'
      }`}
      data-testid={`habit-card-${slug}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
              {habit.name}
            </h3>
            {isCompletedToday && (
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-1">
            {habit.description || 'No description provided'}
          </p>
          
          <div className="pt-2 flex items-center space-x-4">
            <div 
              className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider"
              data-testid={`habit-streak-${slug}`}
            >
              <img src="/icons/streak.svg" alt="Streak" className="w-3.5 h-3.5" />
              <span>{streak} Day Streak</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggle(habit.id)}
            data-testid={`habit-complete-${slug}`}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all duration-200 ${
              isCompletedToday 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isCompletedToday ? (
              <>
                <img src="/icons/check.svg" alt="Done" className="w-5 h-5 brightness-0 invert" />
                <span>Done</span>
              </>
            ) : (
              <span>Complete</span>
            )}
          </button>
          
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(habit)}
              data-testid={`habit-edit-${slug}`}
              className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-all"
              title="Edit Habit"
            >
              <img src="/icons/edit.svg" alt="Edit" className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              data-testid={`habit-delete-${slug}`}
              className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
              title="Delete Habit"
            >
              <img src="/icons/trash.svg" alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
