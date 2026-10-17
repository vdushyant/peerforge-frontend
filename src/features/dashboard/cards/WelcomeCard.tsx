import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomeCard() {
  return (
    <Card className="relative isolate overflow-hidden rounded-[1.7rem] border-0 bg-[radial-gradient(ellipse_at_86%_18%,rgba(70,219,164,0.16),transparent_34%),linear-gradient(115deg,#111e20,#101820_56%,#111927)] py-0 text-white ring-1 ring-inset ring-white/[0.09]">
      <div className="pointer-events-none absolute -right-10 -top-28 -z-10 h-80 w-80 rounded-full border border-emerald-100/[0.07]" />
      <div className="pointer-events-none absolute -right-1 -top-20 -z-10 h-64 w-64 rounded-full border border-emerald-100/[0.06]" />
      <CardContent className="flex flex-col justify-between gap-8 p-6 sm:flex-row sm:items-end sm:p-9">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100/15 bg-emerald-200/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
            <Sparkles className="h-3.5 w-3.5" /> Your PeerForge space
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Welcome back <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Ready to keep learning? Your next useful conversation could be one click away.
          </p>
        </div>
        <Button asChild className="h-11 shrink-0 rounded-xl bg-emerald-300 px-4 font-semibold text-slate-950 shadow-lg shadow-emerald-950/25 hover:bg-emerald-200">
          <Link to="/mentors">Explore mentors <ArrowUpRight /></Link>
        </Button>
      </CardContent>
    </Card>
  );
}
