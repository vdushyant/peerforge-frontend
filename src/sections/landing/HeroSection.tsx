import Container from "@/components/layout/Container";
import HeroIllustration from "./HeroIllustration";
import HeroStats from "./HeroStats";
import HeroBadge from "./HeroBadge";
import HeroTitle from "./HeroTitle";
import HeroActions from "./HeroActions";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden py-20 sm:py-28">

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_68%_34%,rgba(32,175,133,0.15),transparent_38%),radial-gradient(ellipse_at_12%_4%,rgba(82,109,255,0.10),transparent_34%)]" />
      <div className="pointer-events-none absolute right-[12%] top-16 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-[110px]" />

      <Container>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          {/* Left Side */}

          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

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
