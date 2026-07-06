type TestimonialProps = {
  name: string;
  role: string;
  company: string;
  review: string;
};

export default function TestimonialCard({
  name,
  role,
  company,
  review,
}: TestimonialProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/30">

      <div className="flex items-center gap-1 text-yellow-400">

        ★★★★★

      </div>

      <p className="mt-6 italic leading-8 text-slate-300">
        "{review}"
      </p>

      <div className="mt-8">

        <h4 className="font-semibold">
          {name}
        </h4>

        <p className="text-sm text-slate-400">
          {role} · {company}
        </p>

      </div>

    </div>
  );
}