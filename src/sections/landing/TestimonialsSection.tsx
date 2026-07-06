import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import TestimonialCard from "@/components/common/TestimonialCard";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rohan Kapoor",
    role: "Software Engineer",
    company: "Amazon",
    review:
      "PeerForge helped me prepare for my backend interviews with personalized guidance.",
  },
  {
    name: "Sneha Mehta",
    role: "Frontend Developer",
    company: "Adobe",
    review:
      "The mentorship sessions were practical and directly improved my React skills.",
  },
  {
    name: "Ankit Jain",
    role: "SDE-II",
    company: "Microsoft",
    review:
      "Excellent mentors and structured sessions. Highly recommended.",
  },
];

export default function TestimonialsSection() {
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
            badge="Testimonials"
            title="What Developers Say"
            description="Thousands of engineers trust PeerForge to accelerate their careers."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            {testimonials.map((testimonial) => (

              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
              />

            ))}

          </div>

        </motion.section>
      </Container>

    </section>
  );
}