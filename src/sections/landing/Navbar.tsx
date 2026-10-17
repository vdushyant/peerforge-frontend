import Logo from "@/components/branding/Logo";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Mentors", href: "/mentors" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080d13]/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between">

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[13px] font-medium text-slate-300 transition-colors hover:text-emerald-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <Button asChild className="h-10 rounded-xl bg-white/[0.06] px-4 text-white hover:bg-white/10">
                <Link to="/dashboard">Open workspace <ArrowUpRight /></Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-slate-300 hover:text-white">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="h-10 rounded-xl bg-emerald-300 px-4 font-semibold text-slate-950 hover:bg-emerald-200">
                  <Link to="/register">Get started <ArrowUpRight /></Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-white md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/10 bg-[#0b1118] text-white"
            >
              <div className="mt-10 flex flex-col gap-6">

                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="rounded-lg
                    px-3
                    py-2
                    text-lg
                    transition-all
                    duration-200
                    hover:bg-emerald-300/[0.08]
                    hover:text-emerald-100">
                    {item.label}
                  </Link>
                ))}

                <div className="mt-8 flex flex-col gap-4">

                  {isAuthenticated ? (
                    <Button asChild className="rounded-xl bg-emerald-300 text-slate-950 hover:bg-emerald-200">
                      <Link to="/dashboard">Open workspace</Link>
                    </Button>
                  ) : (
                    <>
                      <Button variant="ghost" asChild>
                        <Link to="/login">Log in</Link>
                      </Button>
                      <Button asChild className="rounded-xl bg-emerald-300 text-slate-950 hover:bg-emerald-200">
                        <Link to="/register">Get started</Link>
                      </Button>
                    </>
                  )}

                </div>

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </Container>
    </header >
  );
}
