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
      <div className="p-6">
        <p className="text-muted-foreground">
          Loading mentor profile...
        </p>
      </div>
    );
  }

  if (isError || !mentorProfile) {
    return (
      <div className="p-6">
        <p className="text-destructive">
          Unable to load your mentor profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Mentor Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your mentor profile and track your mentoring activity.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="font-medium">
            {mentorProfile.approvalStatus}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mentor Profile</CardTitle>

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

                <p className="mt-1 text-2xl font-semibold">
                  ₹{mentorProfile.hourlyRate}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-xl font-semibold">Activity overview</h2>
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
            title="Gross successful payments"
            value={analytics.data ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(analytics.data.grossSuccessfulPayments) : "—"}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Gross successful payments are client payments recorded by PeerForge; mentor payouts are not included.
        </p>
      </div>
      
      <MentorAvailabilityCard />
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
