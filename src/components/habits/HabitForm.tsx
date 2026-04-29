'use client';

import React, { useState } from 'react';
import { Habit } from '../../types/habit';
import { validateHabitName } from '../../lib/validators';

interface HabitFormProps {
  initialData?: Partial<Habit>;
  onSubmit: (data: { name: string; description: string; frequency: 'daily' }) => void;
  onCancel: () => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [frequency, setFrequency] = useState<'daily'>('daily');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    onSubmit({ name: validation.value, description, frequency });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-inner"
      data-testid="habit-form"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          {initialData?.id ? 'Edit Habit' : 'Create New Habit'}
        </h3>
        <button 
          type="button" 
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <img src="/icons/close.svg" alt="Close" className="w-6 h-6" />
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-2" role="alert">
          <img src="/icons/error.svg" alt="Error" className="w-5 h-5 text-red-500" />
          <p className="text-red-500 text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="habit-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Habit Name</label>
          <input
            id="habit-name"
            type="text"
            data-testid="habit-name-input"
            placeholder="e.g. Read for 30 mins"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="habit-description" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Description (Optional)</label>
          <textarea
            id="habit-description"
            data-testid="habit-description-input"
            placeholder="Add some details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="habit-frequency" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Frequency</label>
          <div className="relative">
            <select
              id="habit-frequency"
              data-testid="habit-frequency-select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily')}
              className="block w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 appearance-none"
            >
              <option value="daily">Daily</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none opacity-40">
              <img src="/icons/chevron-down.svg" alt="Select" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          data-testid="habit-save-button"
          className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
        >
          {initialData?.id ? 'Update Habit' : 'Save Habit'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default HabitForm;
