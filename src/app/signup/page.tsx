import SignupForm from '../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Sign Up</h1>
        <SignupForm />
      </div>
    </div>
  );
}
