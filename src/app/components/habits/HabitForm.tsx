'use client';

export default function HabitForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Habit Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. Morning Run"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Frequency</label>
        <select className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
          <option>Daily</option>
          <option>Weekly</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add Habit
      </button>
    </form>
  );
}
