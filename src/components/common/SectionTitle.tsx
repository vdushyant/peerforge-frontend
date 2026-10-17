type SectionTitleProps = {
  badge?: string;
  title?: string;
  description?: string;
};

export default function SectionTitle({
  badge,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      {badge && (
        <span className="rounded-full border border-emerald-200/15 bg-emerald-300/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
          {description}
        </p>
      )}

    </div>
  );
}
