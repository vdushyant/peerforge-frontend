import Logo from "@/components/branding/Logo";
import Container from "@/components/layout/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">

      <Container>

        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo */}

          <div>

            <Logo />

            <p className="mt-4 text-slate-400">
              Helping software engineers learn, mentor and grow together.
            </p>

          </div>

          {/* Platform */}

          <div>

            <h3 className="mb-4 font-semibold">
              Platform
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>Home</li>

              <li>Mentors</li>

              <li>How It Works</li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-4 font-semibold">
              Resources
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>FAQ</li>

              <li>Contact</li>

              <li>Support</li>

            </ul>

          </div>

          {/* Legal */}

          <div>

            <h3 className="mb-4 font-semibold">
              Legal
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>Privacy</li>

              <li>Terms</li>

            </ul>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-slate-500">

          © 2026 PeerForge. All rights reserved.

        </div>

      </Container>

    </footer>
  );
}