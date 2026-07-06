import SectionTitle from "@/components/common/SectionTitle";
import Container from "@/components/layout/Container";
import { Search, CalendarDays, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Find a Mentor",
    description:
      "Browse experienced software engineers based on technology and expertise.",
  },
  {
    icon: CalendarDays,
    title: "Book a Session",
    description:
      "Choose a suitable time slot and confirm your mentoring session.",
  },
  {
    icon: Trophy,
    title: "Grow Your Career",
    description:
      "Learn from industry experts and accelerate your software engineering journey.",
  },
];

export default function HowItWorksSection() {
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
          badge="How It Works"
          title="Three Simple Steps"
          description="PeerForge makes finding the right mentor simple and efficient."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {steps.map((step) => {

            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-[#111827] p-8 transition hover:border-violet-500/30 hover:-translate-y-2"
              >

                <Icon className="h-10 w-10 text-violet-400" />

                <h3 className="mt-6 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {step.description}
                </p>

              </div>

            );

          })}

        </div>
      </motion.section>
    </Container>

    </section >
  );
}