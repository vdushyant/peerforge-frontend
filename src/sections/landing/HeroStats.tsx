import Statistic from "@/components/common/Statistic";

export default function HeroStats() {
  return (
    <div className="mt-14 flex flex-wrap gap-12">

      <Statistic
        value="150+"
        label="Expert Mentors"
      />

      <Statistic
        value="1200+"
        label="Sessions Completed"
      />

      <Statistic
        value="4.9★"
        label="Average Rating"
      />

    </div>
  );
}