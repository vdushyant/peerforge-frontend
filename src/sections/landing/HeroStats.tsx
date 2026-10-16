import Statistic from "@/components/common/Statistic";
import { useLandingStats } from "@/features/landing/hooks/useLandingData";

export default function HeroStats() {
  const { data } = useLandingStats();
  return (
    <div className="mt-14 flex flex-wrap gap-12">

      <Statistic
        value={data ? data.mentorCount.toLocaleString("en-IN") : "—"}
        label="Approved Mentors"
      />

      <Statistic
        value={data ? data.completedSessionCount.toLocaleString("en-IN") : "—"}
        label="Sessions Completed"
      />

      <Statistic
        value={data ? `${data.averageRating.toFixed(1)}★` : "—"}
        label="Average Rating"
      />

    </div>
  );
}
