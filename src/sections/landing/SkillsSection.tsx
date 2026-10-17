import SectionTitle from "@/components/common/SectionTitle";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { useLandingSkills } from "@/features/landing/hooks/useLandingData";

export default function SkillsSection() {
  const { data: skills = [], isLoading, isError } = useLandingSkills();
  return (
    <section id="popular-skills" className="py-24 sm:py-28">

      <Container>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            badge="Popular Skills"
            title="Learn Modern Technologies"
            description="Explore the technologies most requested by learners and taught by our mentors."
          />

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {isLoading ? (
              <p className="text-slate-400">Loading skills...</p>
            ) : isError ? (
              <p className="text-slate-400">Skills are temporarily unavailable.</p>
            ) : skills.length === 0 ? (
              <p className="text-slate-400">Skills will appear here as they are added.</p>
            ) : skills.map((skill) => (

              <div
                key={skill.id}
                className="rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5 text-sm text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/30 hover:bg-emerald-300/[0.08] hover:text-emerald-100"
              >
                {skill.name}
              </div>

            ))}

          </div>

        </motion.section>
      </Container>

    </section>
  );
}
