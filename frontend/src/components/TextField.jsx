import { MdErrorOutline } from "react-icons/md";

/**
 * Labelled input with leading icon, inline error and optional hint.
 */
const TextField = ({
  id,
  label,
  icon,
  value,
  onChange,
  error,
  hint,
  type = "text",
  placeholder,
  inputMode,
  maxLength,
  autoFocus = false,
}) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-emerald-950/80"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-emerald-900/50">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          autoFocus={autoFocus}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`field ${icon ? "pl-11" : ""} ${error ? "field-error" : ""}`}
        />
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="animate-fade-in mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600"
        >
          <MdErrorOutline className="shrink-0 text-sm" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="mt-2 text-xs text-emerald-950/55">
            {hint}
          </p>
        )
      )}
    </div>
  );
};

export default TextField;
