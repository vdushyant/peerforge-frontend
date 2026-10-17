import SectionTitle from "@/components/common/SectionTitle";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MentorCard from "@/features/mentor/components/MentorCard";
import { useMentors } from "@/features/mentor/hooks/useMentors";

export default function FeaturedMentorsSection() {
  const navigate = useNavigate();
  const { data: mentors = [], isLoading, isError } = useMentors();

  return (
    <section id="featured-mentors" className="py-24 sm:py-28">
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
            {isLoading ? (
              <p className="text-slate-400">Loading mentors...</p>
            ) : isError ? (
              <p className="text-slate-400">Mentor listings are temporarily unavailable.</p>
            ) : mentors.length === 0 ? (
              <p className="text-slate-400">No approved mentors are listed yet.</p>
            ) : mentors.slice(0, 3).map((mentor) => (
              <MentorCard
                key={mentor.mentorId}
                mentor={mentor}
                onViewProfile={(id) => navigate(`/mentors/${id}`)}
              />
            ))}
          </div>
        </motion.section>
      </Container>
    </section>
  );
}
