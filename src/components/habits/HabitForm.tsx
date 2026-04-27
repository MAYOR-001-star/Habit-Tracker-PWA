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
      className="space-y-4 p-4 border rounded-lg bg-gray-50"
      data-testid="habit-form"
    >
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      <div>
        <label htmlFor="habit-name" className="block text-sm font-medium">Name</label>
        <input
          id="habit-name"
          type="text"
          data-testid="habit-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="habit-description" className="block text-sm font-medium">Description</label>
        <textarea
          id="habit-description"
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>
      <div>
        <label htmlFor="habit-frequency" className="block text-sm font-medium">Frequency</label>
        <select
          id="habit-frequency"
          data-testid="habit-frequency-select"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'daily')}
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="daily">Daily</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          data-testid="habit-save-button"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default HabitForm;
