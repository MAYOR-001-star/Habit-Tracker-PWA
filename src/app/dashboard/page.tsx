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
  const [session, setSession] = useState<{ userId: string; email: string; username?: string } | null>(null);
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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-300" data-testid="dashboard-page">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Habits</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{session.username || session.email}</p>
              </div>
              <button
                onClick={handleLogout}
                data-testid="auth-logout-button"
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
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
              Hey {session.username || 'there'}, <span className="text-indigo-600">track habits!</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              You have {habits.length} habit{habits.length !== 1 ? 's' : ''} to track today
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            data-testid="create-habit-button"
            className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
            </svg>
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
        {habits.length === 0 ? (
          <div 
            className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4" 
            data-testid="empty-state"
          >
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-slate-900 dark:text-white">No habits found</p>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs">
                Start your productivity journey by creating your first habit.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Modern Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl border border-slate-100 dark:border-slate-800 transform animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-6 mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
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
  );
}
