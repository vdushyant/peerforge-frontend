import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="relative">

      <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-2xl">

        <div className="flex items-center gap-4">

          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />

          <div>

            <h3 className="text-xl font-semibold">
              Rahul Sharma
            </h3>

            <p className="text-slate-400">
              Senior Backend Engineer
            </p>

          </div>

        </div>

        <div className="mt-6 flex items-center gap-2 text-yellow-400">

          <Star className="h-5 w-5 fill-yellow-400" />

          <span className="font-semibold">
            4.9
          </span>

          <span className="text-slate-500">
            (126 Reviews)
          </span>

        </div>

        <div className="mt-6 flex flex-wrap gap-2">

          {["Java", "Spring Boot", "AWS", "Docker"].map(skill => (

            <span
              key={skill}
              className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm text-violet-300"
            >
              {skill}
            </span>

          ))}

        </div>

        <Button className="mt-8 w-full">

          Book Session

        </Button>

      </div>

      <div className="absolute -bottom-8 -left-8 rounded-2xl border border-white/10 bg-[#161D2D] p-5 shadow-xl">

        <p className="text-sm text-slate-400">
          Sessions Completed
        </p>

        <h2 className="mt-2 text-3xl font-bold text-violet-400">
          1200+
        </h2>

      </div>

    </div>
  );
}