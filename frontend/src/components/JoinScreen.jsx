export default function JoinScreen({ onJoin }) {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="inline-flex items-center gap-2 mb-8 text-accent font-mono text-xs tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Live &amp; anonymous
        </div>

        <h1 className="text-3xl font-semibold text-slate-100 mb-3">Wire</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          Join the room as a random anonymous user. No signup, no history —
          just whoever's here right now.
        </p>

        <button
          onClick={onJoin}
          className="w-full rounded-lg bg-accent text-base font-semibold py-3 tracking-wide
                     hover:bg-teal-300 active:scale-[0.98] transition-all duration-150"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
}
