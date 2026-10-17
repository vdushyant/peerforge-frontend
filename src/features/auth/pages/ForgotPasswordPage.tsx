import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordResetApi } from "../api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await requestPasswordResetApi(email);
      setSubmitted(true);
    } catch {
      toast.error("We couldn’t process that request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We’ll email a one-time reset link to your account address.">
      {submitted ? (
        <div className="space-y-5 text-center" role="status">
          <p className="text-sm text-slate-300">
            If a verified account exists for that address, a reset link will be sent. Check your inbox.
          </p>
          <Link to="/login" className="text-sm font-medium text-violet-400 hover:text-violet-300">Return to sign in</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required maxLength={255} value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send reset link"}
          </Button>
          <p className="text-center text-sm text-slate-400"><Link to="/login" className="text-violet-400 hover:text-violet-300">Back to sign in</Link></p>
        </form>
      )}
    </AuthLayout>
  );
}
