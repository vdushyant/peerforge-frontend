import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordApi } from "../api";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("The passwords don’t match.");
      return;
    }
    setIsSubmitting(true);
    try {
      await resetPasswordApi(token, password);
      setSubmitted(true);
    } catch {
      toast.error("This reset link is invalid or expired. Request a new one.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Password reset links are valid for 20 minutes and can be used once.">
      {submitted ? (
        <div className="space-y-5 text-center" role="status">
          <p className="text-sm text-slate-300">Your password has been updated. Sign in with your new password.</p>
          <Link to="/login" className="text-sm font-medium text-violet-400 hover:text-violet-300">Go to sign in</Link>
        </div>
      ) : !token ? (
        <div className="space-y-4 text-center" role="alert">
          <p className="text-sm text-slate-300">This reset link is missing its token.</p>
          <Link to="/forgot-password" className="text-sm font-medium text-violet-400 hover:text-violet-300">Request another link</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" autoComplete="new-password" required minLength={8} maxLength={100} value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input id="confirmPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={100} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating…" : "Update password"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
