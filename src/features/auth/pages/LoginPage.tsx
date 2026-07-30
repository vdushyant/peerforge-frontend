import AuthLayout from "@/layouts/AuthLayout";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your mentoring journey."
    >
      <LoginForm />
    </AuthLayout>
  );
}