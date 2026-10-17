import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroActions() {
  return (
    <div className="mt-9 flex flex-wrap gap-3">

      <Button asChild size="lg" className="h-12 rounded-xl bg-emerald-300 px-6 font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 hover:bg-emerald-200">
        <Link to="/mentors">Explore mentors <ArrowRight className="ml-1" /> </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="h-12 rounded-xl border-white/15 bg-white/[0.03] px-6 text-white hover:border-emerald-200/40 hover:bg-white/[0.07] hover:text-white"
      >
        <Link to="/register">Become a mentor</Link>
      </Button>

    </div>
  );
}
