import Container from "@/components/layout/Container";
import HeroIllustration from "./HeroIllustration";
import HeroStats from "./HeroStats";
import HeroBadge from "./HeroBadge";
import HeroTitle from "./HeroTitle";
import HeroActions from "./HeroActions";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24">

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

      <Container>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          {/* Left Side */}

          <div className="grid items-center gap-16 lg:grid-cols-2">

            <div>

              <HeroBadge />

              <HeroTitle />

              <HeroActions />

              <HeroStats />

            </div>

            {/* Right Side */}

            <HeroIllustration />

          </div>

        </motion.section>

      </Container>

    </section>
  );
}