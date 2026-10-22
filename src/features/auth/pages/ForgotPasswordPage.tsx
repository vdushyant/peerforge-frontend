import { Link } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Password reset unavailable" subtitle="Email delivery is not configured yet.">
      <div className="space-y-5 text-center" role="status">
        <p className="text-sm text-slate-300">
          For now, contact PeerForge support if you need help accessing your account.
        </p>
        <Link to="/login" className="text-sm font-medium text-violet-400 hover:text-violet-300">Return to sign in</Link>
      </div>
    </AuthLayout>
  );
}
