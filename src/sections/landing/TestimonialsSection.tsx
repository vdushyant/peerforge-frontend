import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { useFeaturedReviews } from "@/features/landing/hooks/useLandingData";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const { data: reviews = [], isLoading, isError } = useFeaturedReviews();

  if (!isLoading && !isError && reviews.length === 0) {
    return null;
  }

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
            title="What Learners Say"
            description="Feedback shared by learners after completed mentoring sessions."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {isLoading ? (
              <p className="text-slate-400">Loading learner reviews...</p>
            ) : isError ? (
              <p className="text-slate-400">Learner reviews are temporarily unavailable.</p>
            ) : reviews.map((review) => (
              <article key={review.id} className="rounded-3xl border border-white/10 bg-[#111827] p-6">
                <p className="text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </p>
                <blockquote className="mt-4 text-slate-200">“{review.comment}”</blockquote>
                <p className="mt-5 font-semibold text-white">{review.reviewerName}</p>
                <p className="mt-1 text-sm text-slate-400">Learner · reviewed {review.mentorName}</p>
              </article>
            ))}
          </div>
        </motion.section>
      </Container>
    </section>
  );
}
