import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { useLandingStats } from "@/features/landing/hooks/useLandingData";

export default function StatsSection() {
  const { data } = useLandingStats();
  const stats = [
    { value: data ? data.mentorCount.toLocaleString("en-IN") : "—", label: "Approved Mentors" },
    { value: data ? data.completedSessionCount.toLocaleString("en-IN") : "—", label: "Sessions Completed" },
    { value: data ? data.skillCount.toLocaleString("en-IN") : "—", label: "Skills" },
    { value: data ? `${data.averageRating.toFixed(1)}★` : "—", label: "Average Rating" },
  ];

  return (
    <section className="py-24">
      <Container>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br from-[#111b20] to-[#0d141b] p-7 sm:p-10 lg:grid-cols-4">

            {stats.map((stat) => (

              <div
                key={stat.label}
                className="text-center"
              >

                <h2 className="text-3xl font-semibold tracking-tight text-emerald-200 sm:text-4xl">
                  {stat.value}
                </h2>

                <p className="mt-3 text-slate-400">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>
        </motion.section>
      </Container>
    </section>
  );
}
