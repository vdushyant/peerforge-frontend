import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MentorCard from "../components/MentorCard";
import { useMentors } from "../hooks/useMentors";

export default function MentorListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const {
    data: mentors = [],
    isLoading,
    isError,
  } = useMentors();

  const filteredMentors = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return mentors;

    return mentors.filter((mentor) =>
      [mentor.firstName, mentor.lastName, mentor.headline, ...mentor.skills]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [mentors, search]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl py-10 text-sm text-slate-400" role="status">Finding mentors…</div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl py-10 text-sm text-rose-300" role="alert">Mentor listings are temporarily unavailable. Please try again soon.</div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-9 py-2 sm:py-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[radial-gradient(ellipse_at_85%_15%,rgba(54,190,143,0.14),transparent_40%),linear-gradient(135deg,#111b20,#0d141b_65%)] px-6 py-8 sm:px-9 sm:py-10">
        <div className="relative max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">The right person changes everything</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Find your next great mentor.</h1>
          <p className="mt-3 max-w-xl leading-7 text-slate-300">Learn directly from people who have solved the problems you’re working through.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> {mentors.length} mentors to explore</span>
            <span>One-to-one guidance, built around your goals</span>
          </div>
        </div>
      </div>

      <section aria-labelledby="mentor-results-heading">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 id="mentor-results-heading" className="text-xl font-semibold tracking-tight">Mentors for your next step</h2>
            <p className="mt-1 text-sm text-slate-400">Search by name, skill, or area of expertise.</p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try ‘product design’ or ‘Java’"
              aria-label="Search mentors by name, skill, or expertise"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200/40 focus:ring-2 focus:ring-emerald-200/10"
            />
            <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        {filteredMentors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center">
            <p className="font-medium text-slate-200">{mentors.length === 0 ? "Your mentor community is growing" : "No mentors match that search"}</p>
            <p className="mt-2 text-sm text-slate-400">{mentors.length === 0 ? "Check back soon as new mentors join PeerForge." : "Try a different name, skill, or keyword."}</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.mentorId}
                mentor={mentor}
                onViewProfile={(mentorId) => navigate(`/mentors/${mentorId}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
