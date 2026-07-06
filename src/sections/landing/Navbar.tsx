import Logo from "@/components/branding/Logo";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Mentors", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Become Mentor", href: "#" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-slate-300 transition-colors hover:text-violet-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost">
              Login
            </Button>

            <Button>
              Sign Up Free
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/10 bg-[#0B0F19] text-white"
            >
              <div className="mt-10 flex flex-col gap-6">

                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-lg
                    px-3
                    py-2
                    text-lg
                    transition-all
                    duration-200
                    hover:bg-violet-500/10
                    hover:text-violet-400" >
                { item.label }
                  </a>
                ))}

              <div className="mt-8 flex flex-col gap-4">

                <Button variant="ghost">
                  Login
                </Button>

                <Button>
                  Sign Up Free
                </Button>

              </div>

            </div>
          </SheetContent>
        </Sheet>

      </div>
    </Container>
    </header >
  );
}