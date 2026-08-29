const Spinner = ({ label = "Loading books…" }) => {
  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center py-16">
      <p className="text-sm font-medium tracking-wide text-slate-400">{label}</p>
    </div>
  );
};

/**
 * Skeleton placeholder for the card grid.
 */
export const CardSkeleton = ({ count = 8 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }, (_, i) => i).map((i) => (
      <div
        key={i}
        className="glass rounded-2xl p-6"
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
    <div className="divide-y divide-white/5">
      {Array.from({ length: rows }, (_, i) => i).map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-5"
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
