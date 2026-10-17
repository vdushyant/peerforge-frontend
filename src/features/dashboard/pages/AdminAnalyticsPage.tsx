import { useNavigate } from "react-router-dom";
import { Activity, Banknote, CalendarDays, CheckCircle2, Clock3, MessageSquareText, Users, ChartNoAxesCombined } from "lucide-react";
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
    <section className="mx-auto max-w-6xl space-y-7 py-2 sm:py-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"><ChartNoAxesCombined className="h-5 w-5" /></div>
        <div>
        <h2 className="text-2xl font-semibold tracking-tight">Platform analytics</h2>
        <p className="mt-2 text-sm text-slate-400">Operational totals and recent booking activity.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="relative overflow-hidden border-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(55,211,157,0.08),transparent_45%),#0e171c] text-white ring-1 ring-inset ring-white/[0.08]">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="max-w-[75%] text-sm font-medium leading-5 text-slate-400">{label}</CardTitle>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-200/[0.07] text-emerald-100"><Icon className="size-4" /></span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs leading-5 text-slate-500">
        Payment total includes successful, non-refunded payments and does not represent mentor payouts.
      </p>
      <Button variant="outline" onClick={() => navigate(APP_ROUTES.ADMIN.REVIEWS)}>
        Review moderation
      </Button>
    </section>
  );
}
