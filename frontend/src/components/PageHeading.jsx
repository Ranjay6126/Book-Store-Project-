/**
 * Shared page heading used by the create / edit / show / delete screens.
 */
const PageHeading = ({ icon, eyebrow, title, subtitle, tone = "indigo" }) => {
  const tones = {
    indigo: "from-indigo-500 to-violet-600 shadow-indigo-500/40",
    amber: "from-amber-500 to-orange-600 shadow-amber-500/40",
    emerald: "from-emerald-500 to-teal-600 shadow-emerald-500/40",
    rose: "from-rose-500 to-red-600 shadow-rose-500/40",
  };

  return (
    <div className="animate-fade-up mb-8 flex items-start gap-4">
      <span
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${tones[tone]} text-2xl text-white shadow-lg`}
      >
        {icon}
      </span>

      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="text-gradient mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 max-w-xl text-sm text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
