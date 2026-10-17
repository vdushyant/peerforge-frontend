import WelcomeCard from "../cards/WelcomeCard";
import ProfileCompletionCard from "../cards/ProfileCompletionCard";
import BecomeMentorCard from "../cards/BecomeMentorCard";
import UpcomingSessionsCard from "../cards/UpcomingSessionsCard";

export default function DashboardShell() {
  return (
    <div className="mx-auto max-w-7xl space-y-5 py-2 sm:py-4">

      <WelcomeCard />

      <div className="grid gap-6 lg:grid-cols-2">

        <ProfileCompletionCard />

        <BecomeMentorCard />

      </div>

      <UpcomingSessionsCard />

    </div>
  );
}
