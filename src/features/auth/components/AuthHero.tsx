import Logo from "@/components/branding/Logo";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Connect with experienced software engineers",
  "Book 1:1 mentorship sessions",
  "Learn system design, DSA & interviews",
];

export default function AuthHero() {
  return (
    <div className="hidden lg:flex flex-1 flex-col justify-between rounded-3xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent p-12 border border-white/10">

      <div>
        <Logo />

        <h1 className="mt-10 text-5xl font-bold leading-tight text-white">
          Learn.
          <br />
          Mentor.
          <br />
          Grow.
        </h1>

        <p className="mt-6 max-w-md text-lg text-slate-400">
          Join India's growing software engineering community and accelerate
          your career with personalized mentorship.
        </p>
      </div>

      <div className="space-y-5">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-violet-400" />

            <span className="text-slate-300">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}