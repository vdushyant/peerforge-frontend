import MentorCard from "@/components/common/MentorCard";
import SectionTitle from "@/components/common/SectionTitle";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";

const mentors = [
  {
    name: "Rahul Sharma",
    role: "Senior Backend Engineer",
    rating: 4.9,
    skills: ["Java", "Spring Boot", "AWS"],
  },
  {
    name: "Priya Verma",
    role: "Frontend Architect",
    rating: 4.8,
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    name: "Aman Gupta",
    role: "System Design Mentor",
    rating: 5.0,
    skills: ["System Design", "Microservices", "Docker"],
  },
];

export default function FeaturedMentorsSection() {
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
            badge="Featured Mentors"
            title="Learn from Industry Experts"
            description="Connect with experienced software engineers who have worked on real-world products."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.name}
                name={mentor.name}
                role={mentor.role}
                rating={mentor.rating}
                skills={mentor.skills}
              />
            ))}
          </div>
        </motion.section>
      </Container>
    </section>
  );
}