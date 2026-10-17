export default function Logo() {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-200 to-teal-500 shadow-lg shadow-emerald-950/40">

        <span className="text-lg font-black text-slate-950">
          P
        </span>

      </div>

      <span className="text-2xl font-semibold tracking-[-0.045em] text-white">

        Peer

        <span className="text-emerald-200">
          Forge
        </span>

      </span>

    </div>
  );
}
