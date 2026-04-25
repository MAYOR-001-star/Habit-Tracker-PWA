import HabitCard from './HabitCard';

const MOCK_HABITS = [
  { id: '1', name: 'Read 30 mins', streak: 5, completedToday: true },
  { id: '2', name: 'Exercise', streak: 12, completedToday: false },
  { id: '3', name: 'Meditation', streak: 3, completedToday: true },
];

export default function HabitList() {
  return (
    <div className="space-y-4">
      {MOCK_HABITS.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
