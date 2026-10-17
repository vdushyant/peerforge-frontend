import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BriefcaseBusiness, Star } from "lucide-react";

import type { MentorCard as MentorCardData } from "../types/mentor";

interface MentorCardProps {
  mentor: MentorCardData;
  onViewProfile: (mentorId: number) => void;
}

export default function MentorCard({
  mentor,
  onViewProfile,
}: MentorCardProps) {
  return (
    <Card className="group rounded-[1.4rem] border-0 bg-[#0e161c] py-0 text-white ring-1 ring-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:bg-[#111c21] hover:ring-emerald-200/25">
      <CardHeader className="px-5 pt-5">
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 to-teal-500 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/30">
            {mentor.firstName.slice(0, 1)}{mentor.lastName.slice(0, 1)}
          </div>
          <div className="min-w-0 pt-0.5">
            <CardTitle className="truncate text-base font-semibold text-white">{mentor.firstName} {mentor.lastName}</CardTitle>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-400">{mentor.headline}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5 pt-4">
        <div className="flex items-center justify-between border-y border-white/[0.07] py-3 text-sm">
          <span className="inline-flex items-center gap-2 text-slate-300"><BriefcaseBusiness className="h-4 w-4 text-slate-500" />{mentor.yearsOfExperience} yrs experience</span>
          <span className="font-semibold text-white">₹{mentor.hourlyRate}<span className="font-normal text-slate-500"> / hr</span></span>
        </div>

        <div>
          {mentor.skills.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {mentor.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-slate-500">
              No skills added
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
          <span className="font-semibold text-white">{mentor.averageRating.toFixed(1)}</span>
          <span className="text-slate-500">· {mentor.reviewCount} {mentor.reviewCount === 1 ? "review" : "reviews"}</span>
        </div>

        <Button
          onClick={() => onViewProfile(mentor.mentorId)}
          className="h-10 w-full rounded-xl bg-white/[0.06] text-slate-100 hover:bg-emerald-300 hover:text-slate-950"
        >
          View profile <ArrowRight className="ml-auto" />
        </Button>
      </CardContent>
    </Card>
  );
}
