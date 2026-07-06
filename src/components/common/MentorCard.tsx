import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

type MentorCardProps = {
  name: string;
  role: string;
  skills: string[];
  rating: number;
};

export default function MentorCard({
  name,
  role,
  skills,
  rating,
}: MentorCardProps) {
  return (
    <div
  className="
    rounded-3xl
    border
    border-white/10
    bg-[#111827]
    p-6
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-violet-500/30
    hover:shadow-xl
    hover:shadow-violet-500/10
  "
>

      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />

      <h3 className="mt-6 text-2xl font-semibold">
        {name}
      </h3>

      <p className="mt-2 text-slate-400">
        {role}
      </p>

      <div className="mt-5 flex items-center gap-2">

        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

        <span>{rating}</span>

      </div>

      <div className="mt-6 flex flex-wrap gap-2">

        {skills.map((skill) => (

          <span
            key={skill}
            className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300"
          >
            {skill}
          </span>

        ))}

      </div>

      <Button className="mt-8 w-full">

        View Profile

      </Button>

    </div>
  );
}