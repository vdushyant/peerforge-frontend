type StatisticProps = {
  value: string;
  label: string;
};

export default function Statistic({
  value,
  label,
}: StatisticProps) {
  return (
    <div>

      <h2 className="text-3xl font-bold text-white">

        {value}

      </h2>

      <p className="mt-1 text-sm text-slate-400">

        {label}

      </p>

    </div>
  );
}