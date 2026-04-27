'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '../../lib/storage';
import { Habit } from '../../types/habit';
import { HabitCard } from '../../components/habits/HabitCard';
import { HabitForm } from '../../components/habits/HabitForm';
import { toggleHabitCompletion } from '../../lib/habits';

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ userId: string; email: string } | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const currentSession = storage.getSession();
    if (!currentSession) {
      router.push('/login');
      return;
    }
    setSession(currentSession);
    const allHabits = storage.getHabits();
    setHabits(allHabits.filter((h) => h.userId === currentSession.userId));
  }, [router]);

  const handleLogout = () => {
    storage.saveSession(null);
    router.push('/login');
  };

  const handleSaveHabit = (data: { name: string; description: string; frequency: 'daily' }) => {
    if (!session) return;

    let updatedHabits: Habit[];
    const allHabits = storage.getHabits();

    if (editingHabit) {
      updatedHabits = allHabits.map((h) =>
        h.id === editingHabit.id ? { ...h, ...data } : h
      );
    } else {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        userId: session.userId,
        name: data.name,
        description: data.description,
        frequency: data.frequency,
        createdAt: new Date().toISOString(),
        completions: [],
      };
      updatedHabits = [...allHabits, newHabit];
    }

    storage.saveHabits(updatedHabits);
    setHabits(updatedHabits.filter((h) => h.userId === session.userId));
    setIsAdding(false);
    setEditingHabit(null);
  };

  const handleToggleCompletion = (id: string) => {
    if (!session) return;
    const today = new Date().toISOString().split('T')[0];
    const allHabits = storage.getHabits();
    const updatedHabits = allHabits.map((h) =>
      h.id === id ? toggleHabitCompletion(h, today) : h
    );
    storage.saveHabits(updatedHabits);
    setHabits(updatedHabits.filter((h) => h.userId === session.userId));
  };

  const handleDelete = (id: string) => {
    if (!session) return;
    const allHabits = storage.getHabits();
    const updatedHabits = allHabits.filter((h) => h.id !== id);
    storage.saveHabits(updatedHabits);
    setHabits(updatedHabits.filter((h) => h.userId === session.userId));
    setShowDeleteConfirm(null);
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4" data-testid="dashboard-page">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          data-testid="auth-logout-button"
          className="text-red-600 font-medium"
        >
          Logout
        </button>
      </header>

      <main>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Habits</h2>
          <button
            onClick={() => setIsAdding(true)}
            data-testid="create-habit-button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            + Create Habit
          </button>
        </div>

        {(isAdding || editingHabit) && (
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">
              {editingHabit ? 'Edit Habit' : 'New Habit'}
            </h3>
            <HabitForm
              initialData={editingHabit || {}}
              onSubmit={handleSaveHabit}
              onCancel={() => {
                setIsAdding(false);
                setEditingHabit(null);
              }}
            />
          </div>
        )}

        {habits.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed" data-testid="empty-state">
            <p className="text-gray-500">No habits yet. Start tracking today!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={handleToggleCompletion}
                onEdit={setEditingHabit}
                onDelete={(id) => setShowDeleteConfirm(id)}
              />
            ))}
          </div>
        )}
      </main>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
            <p className="mb-6">This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                data-testid="confirm-delete-button"
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
