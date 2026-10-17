import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_ROUTES } from "@/constants/routes";
import { useMyMentorProfile } from "@/features/mentor/hooks/useMyMentorProfile";
import { ArrowRight, BadgeCheck, GraduationCap } from "lucide-react";

export default function BecomeMentorCard() {
  const navigate = useNavigate();
  const { data: mentorProfile, isLoading } = useMyMentorProfile();

  const hasMentorProfile = Boolean(mentorProfile);
  const isRejected = mentorProfile?.approvalStatus === "REJECTED";

  const handleAction = () => {
    if (mentorProfile) {
      navigate(isRejected ? APP_ROUTES.MENTOR.BECOME : APP_ROUTES.MENTOR.DASHBOARD);
      return;
    }
    navigate(APP_ROUTES.MENTOR.BECOME);
  };

  return (
    <Card className={`group relative overflow-hidden rounded-[1.5rem] border-0 py-0 text-white ring-1 ring-inset transition-all duration-300 hover:-translate-y-0.5 ${isRejected ? "bg-[radial-gradient(ellipse_at_100%_0%,rgba(251,191,36,0.12),transparent_38%),#171711] ring-amber-100/10 hover:ring-amber-100/20" : "bg-[radial-gradient(ellipse_at_100%_0%,rgba(55,211,157,0.12),transparent_38%),#10191a] ring-white/[0.08] hover:ring-emerald-100/20"}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent" />
      <CardHeader className="flex flex-row items-center gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isRejected ? "border-amber-100/10 bg-amber-200/[0.07] text-amber-100" : "border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"}`}>
          {hasMentorProfile && !isRejected ? <BadgeCheck className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
        </div>
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${isRejected ? "text-amber-200/80" : "text-emerald-200/75"}`}>
            {isLoading ? "Mentor journey" : hasMentorProfile ? isRejected ? "Application update" : "Mentor space" : "Share what you know"}
          </p>
          <CardTitle className="mt-1 text-lg font-semibold tracking-tight text-white">
            {hasMentorProfile
              ? isRejected ? "Update your application" : "Your mentor dashboard"
              : "Become a mentor"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
        <p className="min-h-12 max-w-xl text-sm leading-6 text-slate-400">
          {hasMentorProfile
            ? isRejected
              ? `Your application was declined: ${mentorProfile?.rejectionReason ?? "Update your application details and try again."}`
              : "Manage your mentor profile and keep track of the learners you’re helping."
            : "Share your experience, guide learners, and earn through paid mentoring sessions."}
        </p>
        <Button
          onClick={handleAction}
          disabled={isLoading}
          className={`mt-5 h-10 rounded-xl px-4 font-semibold ${isRejected ? "bg-amber-200 text-slate-950 hover:bg-amber-100" : "bg-emerald-300 text-slate-950 hover:bg-emerald-200"}`}
        >
          {isLoading
            ? "Checking..."
            : hasMentorProfile
              ? isRejected ? "Update application" : "Open mentor dashboard"
              : "Explore mentoring"}
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}
