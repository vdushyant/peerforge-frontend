import { useState } from "react";

import MentorApplicationForm from "../components/MentorApplicationForm";
import { useMyMentorProfile } from "../hooks/useMyMentorProfile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function BecomeMentorPage() {
  const [submitted, setSubmitted] = useState(false);
  const mentor = useMyMentorProfile();

  if (mentor.isLoading) {
    return <p className="p-6 text-muted-foreground">Checking your application status…</p>;
  }

  if (mentor.data && mentor.data.approvalStatus !== "REJECTED") {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-2xl rounded-xl border p-8">
          <h1 className="text-2xl font-semibold">Mentor application</h1>
          <p className="mt-3 text-muted-foreground">
            Your application is {mentor.data.approvalStatus.toLowerCase()}.
          </p>
          {mentor.data.approvalStatus === "APPROVED" ? (
            <Button asChild className="mt-6"><Link to="/mentor/dashboard">Open mentor dashboard</Link></Button>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">You’ll receive a notification when an admin reviews it.</p>
          )}
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-2xl rounded-xl border p-8">
          <h1 className="text-2xl font-semibold">
            Application Submitted
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your mentor application has been submitted and is
            currently awaiting approval.
          </p>

          <div className="mt-6 rounded-lg border p-4">
            <p className="font-medium">
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
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            {mentor.data?.approvalStatus === "REJECTED" ? "Update your mentor application" : "Become a Mentor"}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {mentor.data?.approvalStatus === "REJECTED"
              ? "Review the feedback, update your details, and submit the application again."
              : "Share your experience and help other developers grow their skills."}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          {mentor.data?.rejectionReason && (
            <p className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
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
