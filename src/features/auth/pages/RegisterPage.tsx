import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your mentoring journey today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}