'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '../../lib/storage';
import { Habit } from '../../types/habit';
import { HabitList } from '../../components/habits/HabitList';
import { HabitForm } from '../../components/habits/HabitForm';
import { toggleHabitCompletion } from '../../lib/habits';
import { ProtectedRoute } from '../../components/shared/ProtectedRoute';
import { logoutUser } from '../../lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ userId: string; email: string } | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const currentSession = storage.getSession();
    if (currentSession) {
      setSession(currentSession);
      const allHabits = storage.getHabits();
      setHabits(allHabits.filter((h) => h.userId === currentSession.userId));
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.replace('/login');
  };

  const handleSaveHabit = (data: { name: string; description: string; frequency: 'daily' }) => {
    if (!session) return;

    let updatedHabits: Habit[];
    const allHabits = storage.getHabits();

    if (editingHabit) {
      updatedHabits = allHabits.map((h) =>
        h.id === editingHabit.id ? { ...h, name: data.name, description: data.description, frequency: data.frequency } : h
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-300" data-testid="dashboard-page">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-700 p-1.5 overflow-hidden">
                  <img src="/icons/habit-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Habits</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-tight">
                    {session?.email || 'User'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  data-testid="auth-logout-button"
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <img src="/icons/logout.svg" alt="Logout" className="w-6 h-6 opacity-60 hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Your Habits <span className="opacity-60">— stay consistent!</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                You have <span className="text-slate-900 dark:text-white font-bold">{habits.length}</span> active habits
              </p>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              data-testid="create-habit-button"
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              <img src="/icons/plus.svg" alt="Add" className="w-5 h-5 brightness-0 invert" />
              <span>New Habit</span>
            </button>
          </div>

          {/* Modal Overlay for Adding/Editing */}
          {(isAdding || editingHabit) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="max-w-lg w-full transform animate-in slide-in-from-bottom-4 duration-300">
                <HabitForm
                  initialData={editingHabit || {}}
                  onSubmit={handleSaveHabit}
                  onCancel={() => {
                    setIsAdding(false);
                    setEditingHabit(null);
                  }}
                />
              </div>
            </div>
          )}

          {/* Habits List */}
          <HabitList
            habits={habits}
            onToggle={handleToggleCompletion}
            onEdit={setEditingHabit}
            onDelete={(id) => setShowDeleteConfirm(id)}
          />
        </main>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="py-10 fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl border border-slate-100 dark:border-slate-800 transform animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto p-4">
                <img src="/icons/trash.svg" alt="Delete" className="w-full h-full text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Are you sure?</h3>
              <p className="text-center text-slate-500 dark:text-slate-400 font-medium mb-8">
                This action cannot be undone. All streak data for this habit will be lost.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  data-testid="confirm-delete-button"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-500/20 transition-all"
                >
                  Delete Habit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
