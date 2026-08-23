/**
 * Orbiting dual-ring loader.
 */
const Spinner = ({ label = "Loading books…" }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in flex flex-col items-center justify-center gap-5 py-16"
    >
      <div className="relative h-16 w-16">
        {/* soft halo */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/45 blur-xl" />

        {/* outer ring */}
        <span className="animate-spin-slow absolute inset-0 rounded-full border-2 border-emerald-950/15 border-t-mint-500 border-r-blush-300" />

        {/* inner counter ring */}
        <span
          className="animate-spin-slow absolute inset-3 rounded-full border-2 border-emerald-950/15 border-b-accent-400"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        />

        {/* core */}
        <span className="absolute inset-[38%] rounded-full bg-linear-to-br from-mint-400 to-blush-300 shadow-[0_0_18px_rgba(80,200,120,0.9)]" />
      </div>

      <p className="text-sm font-medium tracking-wide text-emerald-950/70">{label}</p>
    </div>
  );
};

/**
 * Skeleton placeholder for the card grid.
 */
export const CardSkeleton = ({ count = 8 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="glass animate-fade-up rounded-2xl p-6"
        style={{ animationDelay: `${i * 60}ms` }}
      >
        <div className="skeleton h-3 w-20" />
        <div className="mt-5 flex items-center gap-3">
          <div className="skeleton h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-4/5" />
            <div className="skeleton h-3 w-2/5" />
          </div>
        </div>
        <div className="skeleton mt-6 h-3 w-1/2" />
        <div className="skeleton mt-7 h-9 w-full rounded-full" />
      </div>
    ))}
  </div>
);

/**
 * Skeleton placeholder for the table view.
 */
export const TableSkeleton = ({ rows = 6 }) => (
  <div className="glass overflow-hidden rounded-2xl">
    <div className="skeleton h-14 w-full rounded-none" />
    <div className="divide-y divide-emerald-950/10">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-fade-up flex items-center gap-4 px-6 py-5"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div className="skeleton h-8 w-8 rounded-lg" />
          <div className="skeleton h-4 flex-1" />
          <div className="skeleton hidden h-4 w-40 md:block" />
          <div className="skeleton hidden h-4 w-16 md:block" />
          <div className="skeleton h-8 w-28 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export default Spinner;
