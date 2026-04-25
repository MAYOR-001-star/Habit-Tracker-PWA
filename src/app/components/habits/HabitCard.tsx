'use client';

interface HabitProps {
  habit: {
    id: string;
    name: string;
    streak: number;
    completedToday: boolean;
  };
}

export default function HabitCard({ habit }: HabitProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
        <p className="text-sm text-gray-500">🔥 {habit.streak} day streak</p>
      </div>
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          habit.completedToday
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
        }`}
      >
        {habit.completedToday ? 'Completed' : 'Mark Done'}
      </button>
    </div>
  );
}
