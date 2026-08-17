import { LoginForm } from "@/features/auth";

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 to-indigo-100">
      <LoginForm />
    </div>
  );
}
