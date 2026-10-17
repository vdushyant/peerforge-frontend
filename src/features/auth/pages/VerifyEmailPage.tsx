import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resendVerificationApi, verifyEmailApi } from "../api";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [resendSubmitted, setResendSubmitted] = useState(false);
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

  async function resend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await resendVerificationApi(email);
      setResendSubmitted(true);
    } catch {
      toast.error("We couldn’t process that request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title={token ? "Verify your email" : "Resend verification email"} subtitle="Email verification helps protect your PeerForge account.">
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
      ) : resendSubmitted ? (
        <div className="space-y-5 text-center" role="status">
          <p className="text-sm text-slate-300">If the account needs verification, a new link will be sent to that address.</p>
          <Link to="/login" className="text-sm font-medium text-violet-400 hover:text-violet-300">Return to sign in</Link>
        </div>
      ) : (
        <form onSubmit={resend} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required maxLength={255} value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Resend verification link"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
