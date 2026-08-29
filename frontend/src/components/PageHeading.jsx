/**
 * Shared page heading used by the create / edit / show / delete screens.
 */
const PageHeading = ({ icon, eyebrow, title, subtitle, tone = "indigo" }) => {
  const tones = {
    indigo: "bg-[#607c5d]",
    amber: "bg-[#987455]",
    emerald: "bg-[#4d7557]",
    rose: "bg-[#a65d4e]",
  };

  return (
    <div className="animate-fade-up mb-8 flex items-start gap-4">
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-md ${tones[tone]} text-xl text-white`}
      >
        {icon}
      </span>

      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-[#29382e] sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 max-w-xl text-sm text-[#718077]">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
