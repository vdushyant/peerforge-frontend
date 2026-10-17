import Logo from "@/components/branding/Logo";
import Container from "@/components/layout/Container";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#070b10] py-14">

      <Container>

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* Logo */}

          <div>

            <Logo />

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Helping software engineers learn, mentor and grow together.
            </p>

          </div>

          {/* Platform */}

          <div>

            <h3 className="mb-4 font-semibold">
              Platform
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">

              <li><Link className="transition hover:text-emerald-200" to="/#home">Home</Link></li>

              <li><Link className="transition hover:text-emerald-200" to="/mentors">Find a mentor</Link></li>

              <li><Link className="transition hover:text-emerald-200" to="/#how-it-works">How it works</Link></li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-4 font-semibold">
              Get involved
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">

              <li><Link className="transition hover:text-emerald-200" to="/register">Become a mentor</Link></li>

              <li><Link className="transition hover:text-emerald-200" to="/register">Create an account</Link></li>

            </ul>

          </div>

        </div>

        <div className="mt-12 border-t border-white/[0.07] pt-6 text-sm text-slate-500">

          © {new Date().getFullYear()} PeerForge. Built for people who want to keep growing.

        </div>

      </Container>

    </footer>
  );
}
