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
        ? 'bg-indigo-600/5 dark:bg-indigo-500/10 border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5'
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
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-1">
            {habit.description || 'No description provided'}
          </p>
          
          <div className="pt-2 flex items-center space-x-4">
            <div 
              className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider"
              data-testid={`habit-streak-${slug}`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.312L8.667 4.19a2.36 2.36 0 00-.83 1.187L7.042 7.824a1 1 0 001.317 1.222l2.36-.944a1 1 0 011.23.493l.8 1.6a1 1 0 001.442.312l3.273-2.182a1 1 0 00.312-1.442L12.395 2.553zM6.666 12.001c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2z" clipRule="evenodd" />
              </svg>
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
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isCompletedToday ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
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
              className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all"
              title="Edit Habit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              data-testid={`habit-delete-${slug}`}
              className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
              title="Delete Habit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
