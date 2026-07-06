import SectionTitle from "@/components/common/SectionTitle";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";

const skills = [
  "Java",
  "Spring Boot",
  "React",
  "TypeScript",
  "System Design",
  "Docker",
  "AWS",
  "PostgreSQL",
  "Microservices",
  "Node.js",
  "Python",
  "Machine Learning",
];

export default function SkillsSection() {
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

            {skills.map((skill) => (

              <div
                key={skill}
                className="rounded-full border border-violet-500/20 bg-[#111827] px-6 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10"
              >
                {skill}
              </div>

            ))}

          </div>

        </motion.section>
      </Container>

    </section>
  );
}