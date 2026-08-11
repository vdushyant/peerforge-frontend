import { useState } from "react";

import MentorApplicationForm from "../components/MentorApplicationForm";

export default function BecomeMentorPage() {
  const [submitted, setSubmitted] = useState(false);

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
            Become a Mentor
          </h1>

          <p className="mt-2 text-muted-foreground">
            Share your experience and help other developers
            grow their skills.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <MentorApplicationForm
            onSuccess={() => setSubmitted(true)}
          />
        </div>
      </div>
    </div>
  );
}