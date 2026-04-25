import HabitList from '../components/habits/HabitList';
import HabitForm from '../components/habits/HabitForm';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-indigo-700">My Habits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <HabitList />
          </div>
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>
              <HabitForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
