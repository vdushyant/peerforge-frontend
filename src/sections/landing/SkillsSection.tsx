import SectionTitle from "@/components/common/SectionTitle";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { useLandingSkills } from "@/features/landing/hooks/useLandingData";

export default function SkillsSection() {
  const { data: skills = [], isLoading, isError } = useLandingSkills();
  return (
    <section className="py-24">

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
                className="rounded-full border border-violet-500/20 bg-[#111827] px-6 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10"
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
