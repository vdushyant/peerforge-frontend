import { useState } from "react";

import MentorApplicationForm from "../components/MentorApplicationForm";
import { useMyMentorProfile } from "../hooks/useMyMentorProfile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function BecomeMentorPage() {
  const [submitted, setSubmitted] = useState(false);
  const mentor = useMyMentorProfile();

  if (mentor.isLoading) {
    return <p className="py-8 text-sm text-slate-400" role="status">Checking your application status…</p>;
  }

  if (mentor.data && mentor.data.approvalStatus !== "REJECTED") {
    return (
      <div className="mx-auto max-w-4xl py-2 sm:py-5">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[1.5rem] border-0 bg-[#0e171c] p-6 shadow-lg shadow-black/10 ring-1 ring-inset ring-white/[0.08] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/75">Mentor journey</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Mentor application</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Your application is {mentor.data.approvalStatus.toLowerCase()}.
          </p>
          {mentor.data.approvalStatus === "APPROVED" ? (
            <Button asChild className="mt-6"><Link to="/mentor/dashboard">Open mentor dashboard</Link></Button>
          ) : (
            <p className="mt-4 text-sm text-slate-400">You’ll receive a notification when an admin reviews it.</p>
          )}
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-4xl py-2 sm:py-5">
        <div className="mx-auto max-w-2xl rounded-[1.5rem] border-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(55,211,157,0.1),transparent_42%),#0e171c] p-6 shadow-lg shadow-black/10 ring-1 ring-inset ring-white/[0.08] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/75">Application received</p>
          <h1 className="text-2xl font-semibold">
            Application Submitted
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your mentor application has been submitted and is
            currently awaiting approval.
          </p>

          <div className="mt-6 rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.04] p-4">
            <p className="font-medium text-emerald-100">
              Status: PENDING
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              You will be able to provide mentoring sessions
              after your application is approved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-2 sm:py-5">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/75">Mentor journey</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {mentor.data?.approvalStatus === "REJECTED" ? "Update your mentor application" : "Become a Mentor"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {mentor.data?.approvalStatus === "REJECTED"
              ? "Review the feedback, update your details, and submit the application again."
              : "Share your experience and help other developers grow their skills."}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border-0 bg-[#0e171c] p-5 shadow-lg shadow-black/10 ring-1 ring-inset ring-white/[0.08] sm:p-7">
          {mentor.data?.rejectionReason && (
            <p className="mb-5 rounded-2xl border border-amber-200/10 bg-amber-200/[0.045] p-4 text-sm leading-6 text-amber-50">
              <span className="font-medium">Admin feedback: </span>{mentor.data.rejectionReason}
            </p>
          )}
          <MentorApplicationForm
            initialValues={mentor.data?.approvalStatus === "REJECTED" ? {
              about: mentor.data.about,
              hourlyRate: mentor.data.hourlyRate,
            } : undefined}
            onSuccess={() => setSubmitted(true)}
          />
        </div>
      </div>
    </div>
  );
}
