import { useNavigate } from "react-router-dom";
import { Activity, Banknote, CalendarDays, CheckCircle2, Clock3, MessageSquareText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_ROUTES } from "@/constants/routes";
import { usePlatformAnalytics } from "../hooks/useDashboardAnalytics";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function AdminAnalyticsPage() {
  const navigate = useNavigate();
  const analytics = usePlatformAnalytics();

  if (analytics.isLoading) return <p className="text-muted-foreground">Loading platform analytics…</p>;
  if (analytics.isError || !analytics.data) {
    return <p className="text-destructive">Platform analytics could not be loaded.</p>;
  }

  const metrics = [
    { label: "Registered users", value: analytics.data.totalUsers, icon: Users },
    { label: "Approved mentors", value: analytics.data.approvedMentors, icon: CheckCircle2 },
    { label: "Mentor applications pending", value: analytics.data.pendingMentorApplications, icon: Clock3 },
    { label: "Bookings in last 30 days", value: analytics.data.bookingsLast30Days, icon: Activity },
    { label: "All sessions", value: analytics.data.totalSessions, icon: CalendarDays },
    { label: "Sessions awaiting action", value: analytics.data.pendingSessions, icon: Clock3 },
    { label: "Completed sessions", value: analytics.data.completedSessions, icon: CheckCircle2 },
    { label: "Cancelled sessions", value: analytics.data.cancelledSessions, icon: CalendarDays },
    { label: "Reviews awaiting moderation", value: analytics.data.pendingReviews, icon: MessageSquareText },
    { label: "Gross successful payments", value: currency.format(analytics.data.grossSuccessfulPayments), icon: Banknote },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Platform analytics</h2>
        <p className="mt-2 text-sm text-muted-foreground">Operational totals and recent booking activity.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Payment total includes successful, non-refunded payments and does not represent mentor payouts.
      </p>
      <Button variant="outline" onClick={() => navigate(APP_ROUTES.ADMIN.REVIEWS)}>
        Review moderation
      </Button>
    </section>
  );
}
