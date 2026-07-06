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
        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg text-slate-400">
          {description}
        </p>
      )}

    </div>
  );
}