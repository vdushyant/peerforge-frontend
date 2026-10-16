import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_ROUTES } from "@/constants/routes";
import { useMyMentorProfile } from "@/features/mentor/hooks/useMyMentorProfile";

export default function BecomeMentorCard() {
  const navigate = useNavigate();

  const {
    data: mentorProfile,
    isLoading,
  } = useMyMentorProfile();

  const handleAction = () => {
    if (mentorProfile) {
      if (mentorProfile.approvalStatus === "REJECTED") {
        navigate(APP_ROUTES.MENTOR.BECOME);
        return;
      }
      navigate(APP_ROUTES.MENTOR.DASHBOARD);
      return;
    }

    navigate(APP_ROUTES.MENTOR.BECOME);
  };

  const hasMentorProfile = Boolean(mentorProfile);
  const isRejected = mentorProfile?.approvalStatus === "REJECTED";

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {hasMentorProfile
            ? isRejected ? "Update Mentor Application" : "Mentor Dashboard"
            : "Become a Mentor"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {hasMentorProfile
            ? isRejected
              ? `Your application was declined: ${mentorProfile?.rejectionReason ?? "Please update your application and try again."}`
              : "Manage your mentor profile and track your mentoring activity."
            : "Share your knowledge, connect with learners and earn money through paid mentorship sessions."}
        </p>

        <Button
          onClick={handleAction}
          disabled={isLoading}
        >
          {isLoading
            ? "Checking..."
            : hasMentorProfile
              ? isRejected ? "Update Application" : "Open Mentor Dashboard"
              : "Become Mentor"}
        </Button>
      </CardContent>
    </Card>
  );
}
