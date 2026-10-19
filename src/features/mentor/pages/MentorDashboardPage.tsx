import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MentorProfileForm from "../components/MentorProfileForm";
import { useMyMentorProfile } from "../hooks/useMyMentorProfile";
import MentorAvailabilityCard from "../components/MentorAvailabilityCard";
import { useMentorDashboardAnalytics } from "@/features/dashboard/hooks/useDashboardAnalytics";
import { GraduationCap } from "lucide-react";

export default function MentorDashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const analytics = useMentorDashboardAnalytics();

  const {
    data: mentorProfile,
    isLoading,
    isError,
  } = useMyMentorProfile();

  if (isLoading) {
    return (
      <div className="py-8">
        <p className="text-sm text-slate-400" role="status">
          Loading mentor profile...
        </p>
      </div>
    );
  }

  if (isError || !mentorProfile) {
    return (
      <div className="py-8">
        <p className="text-sm text-rose-300" role="alert">
          Unable to load your mentor profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7 py-2 sm:py-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"><GraduationCap className="h-5 w-5" /></div>
        <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Mentor Dashboard
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Manage your mentor profile and track your mentoring activity.
        </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="inline-flex rounded-full border border-emerald-100/10 bg-emerald-200/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-100">
            {mentorProfile.approvalStatus}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-semibold tracking-tight">Mentor Profile</CardTitle>

          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </CardHeader>

        <CardContent>
          {isEditing ? (
            <MentorProfileForm
              profile={mentorProfile}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
            />
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium">
                  About
                </p>

                <p className="mt-1 text-muted-foreground">
                  {mentorProfile.about}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  Hourly Rate
                </p>

                <p className="mt-1 text-2xl font-semibold text-emerald-100">
                  ₹{mentorProfile.hourlyRate}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-xl font-semibold tracking-tight">Activity overview</h2>
        {analytics.isError && (
          <p className="mb-3 text-sm text-destructive">Activity metrics could not be loaded.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard title="Completed sessions" value={analytics.data?.completedSessions ?? "—"} />
          <MetricCard title="Pending booking requests" value={analytics.data?.pendingBookings ?? "—"} />
          <MetricCard title="Upcoming confirmed sessions" value={analytics.data?.upcomingSessions ?? "—"} />
          <MetricCard title="Approved reviews" value={analytics.data?.approvedReviewCount ?? "—"} />
          <MetricCard title="Average rating" value={analytics.data?.averageRating.toFixed(1) ?? "—"} />
          <MetricCard
            title="Client payments processed"
            value={analytics.data ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(analytics.data.grossSuccessfulPayments) : "—"}
          />
          <MetricCard
            title="Payouts awaiting setup"
            value={analytics.data ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(analytics.data.pendingPayouts) : "—"}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Client payment totals include the PeerForge fee. Payouts are tracked at the mentor’s listed session price; transfers will begin after PeerForge enables Razorpay Route and your payout account is linked.
        </p>
      </div>
      
      <MentorAvailabilityCard />
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="border-0 bg-[#0e171c] text-white ring-1 ring-inset ring-white/[0.08]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
      </CardContent>
    </Card>
  );
}
