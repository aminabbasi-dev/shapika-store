import { RegisterForm } from "@/features/auth";

export default async function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <RegisterForm />
    </div>
  );
}
