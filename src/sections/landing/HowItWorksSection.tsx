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
    <section id="how-it-works" className="border-y border-white/[0.05] bg-white/[0.015] py-24 sm:py-28">

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

        <div className="mt-14 grid gap-4 lg:grid-cols-3">

          {steps.map((step) => {

            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="group rounded-[1.65rem] border border-white/[0.08] bg-[#0d141b] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/25 hover:bg-[#101a20]"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.08]">
                  <Icon className="h-5 w-5 text-emerald-200" />
                </div>

                <h3 className="mt-7 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
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
