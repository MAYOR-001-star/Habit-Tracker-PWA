export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-indigo-600 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-white">HabitTracker</h1>
      </div>
    </div>
  );
}
