import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-24">

      <Container>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div id="become-mentor" className="relative overflow-hidden rounded-[1.8rem] border border-emerald-100/15 bg-[radial-gradient(ellipse_at_80%_0%,rgba(73,220,165,0.2),transparent_38%),linear-gradient(120deg,#12241f,#122029_55%,#141d2c)] px-6 py-12 text-center shadow-2xl shadow-black/20 sm:px-12 sm:py-16">

            <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Ready to Accelerate Your Career?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Join PeerForge today and start learning from experienced software engineers.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-xl bg-emerald-300 px-6 font-semibold text-slate-950 hover:bg-emerald-200"
            >
              <Link to="/register">Get Started</Link>
            </Button>

          </div>
        </motion.section>
      </Container>

    </section>
  );
}
