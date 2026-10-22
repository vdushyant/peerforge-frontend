import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { verifyEmailApi } from "../api";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [verified, setVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function verify() {
    setIsSubmitting(true);
    try {
      await verifyEmailApi(token);
      setVerified(true);
    } catch {
      toast.error("This verification link is invalid or expired. You can request another.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title={token ? "Verify your email" : "Email verification disabled"} subtitle="Email delivery is not configured yet.">
      {verified ? (
        <div className="space-y-5 text-center" role="status">
          <p className="text-sm text-slate-300">Email verified. You can now sign in.</p>
          <Link to="/login" className="text-sm font-medium text-violet-400 hover:text-violet-300">Go to sign in</Link>
        </div>
      ) : token ? (
        <div className="space-y-5">
          <Button className="w-full" onClick={verify} disabled={isSubmitting}>
            {isSubmitting ? "Verifying…" : "Verify email address"}
          </Button>
          <p className="text-center text-sm text-slate-400"><Link to="/verify-email" className="text-violet-400 hover:text-violet-300">Request a fresh verification link</Link></p>
        </div>
      ) : (
        <div className="space-y-5 text-center" role="status">
          <p className="text-sm text-slate-300">New accounts can sign in immediately. Verification emails are temporarily turned off.</p>
          <Link to="/login" className="text-sm font-medium text-violet-400 hover:text-violet-300">Return to sign in</Link>
        </div>
      )}
    </AuthLayout>
  );
}
