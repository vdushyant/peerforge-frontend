export default function Logo() {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 shadow-lg shadow-violet-500/20">

        <span className="text-xl font-black text-white">
          P
        </span>

      </div>

      <span className="text-3xl font-bold tracking-tight">

        Peer

        <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
          Forge
        </span>

      </span>

    </div>
  );
}