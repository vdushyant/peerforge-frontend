import Statistic from "@/components/common/Statistic";
import { useLandingStats } from "@/features/landing/hooks/useLandingData";

export default function HeroStats() {
  const { data } = useLandingStats();
  return (
    <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-7">

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
