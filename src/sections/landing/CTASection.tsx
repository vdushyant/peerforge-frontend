import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";

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
          <div className="rounded-[32px] bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 p-16 text-center">

            <h2 className="text-5xl font-bold">
              Ready to Accelerate Your Career?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-violet-100">
              Join PeerForge today and start learning from experienced software engineers.
            </p>

            <Button
              size="lg"
              className="mt-10 bg-white text-violet-700 hover:bg-slate-100"
            >
              Get Started
            </Button>

          </div>
        </motion.section>
      </Container>

    </section>
  );
}