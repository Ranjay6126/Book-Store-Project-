import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { TbCalendarStats, TbBooks } from "react-icons/tb";

const BookModal = ({ book, onClose }) => {
  const [page, setPage] = useState(0);
  const storyPages = useMemo(() => {
    const pages = String(book.story || "").split(/\n\s*---PAGE---\s*\n/).map((part) => part.trim()).filter(Boolean);
    return pages.length ? pages : [book.description || "No preview story has been added for this book yet."];
  }, [book.description, book.story]);
  /* Close on Escape, and lock background scroll while open */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${book.title}`}
      onClick={onClose}
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/45 p-4 backdrop-blur-md"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="glass animate-pop relative w-full max-w-2xl overflow-hidden rounded-3xl"
      >
        {/* gradient top edge */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#50C878] via-[#fbaed2] to-[#f0dc82]"
        />
        {/* corner glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-blush-300/60 blur-3xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-5 right-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/70 text-lg text-emerald-950/70 ring-1 ring-emerald-950/10 transition-all duration-300 hover:rotate-90 hover:bg-rose-500/25 hover:text-white hover:ring-rose-500/50"
        >
          <AiOutlineClose />
        </button>

          <div className="relative max-h-[85vh] overflow-y-auto p-7 sm:p-9">
          {/* header */}
          <div className="flex items-start gap-4 pr-12">
            {book.coverImage ? <img src={book.coverImage} alt={`${book.title} cover`} className="h-20 w-14 shrink-0 rounded-lg object-cover shadow-lg ring-1 ring-emerald-950/15" /> : <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-mint-500 to-teal-600 shadow-lg"><PiBookOpenTextLight className="text-3xl text-white" /></span>}

            <div className="min-w-0">
              <p className="eyebrow">Quick preview</p>
              <h2 className="mt-1 text-2xl leading-tight font-bold tracking-tight text-emerald-950">
                {book.title}
              </h2>
            </div>
          </div>

          {/* meta grid */}
          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            <Meta
              icon={<BiUserCircle />}
              label="Author"
              value={book.author}
              iconColor="text-pink-700"
            />
            <Meta
              icon={<TbCalendarStats />}
              label="Publish year"
              value={book.publishYear}
              iconColor="text-amber-700"
            />
            <Meta icon={<PiBookOpenTextLight />} label="Genre" value={book.genre || "General"} iconColor="text-teal-700" />
            <Meta icon={<TbBooks />} label="Length" value={book.pages ? `${book.pages} pages` : "—"} iconColor="text-yellow-700" />
          </dl>

          <div className="mt-7 rounded-2xl border border-emerald-950/10 bg-white/55 p-5">
            <h3 className="text-gradient text-base font-semibold">About this book</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
              {book.description || "A new addition to your library."}
            </p>
          </div>

          <section className="mt-5 rounded-2xl border border-emerald-950/10 bg-emerald-950/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-emerald-950">Story preview</h3>
              <span className="text-xs font-semibold text-emerald-800">Page {page + 1} of {storyPages.length}</span>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{storyPages[page]}</p>
            {storyPages.length > 1 && <div className="mt-5 flex gap-2 border-t border-emerald-950/10 pt-4"><button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} className="btn-ghost text-xs disabled:cursor-not-allowed disabled:opacity-40">Previous</button><button type="button" onClick={() => setPage((current) => Math.min(storyPages.length - 1, current + 1))} disabled={page === storyPages.length - 1} className="btn-primary text-xs disabled:cursor-not-allowed disabled:opacity-40">Next page</button></div>}
          </section>

          {/* footer actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to={`/books/details/${book._id}`} className="btn-primary text-sm">
              <BsInfoCircle className="text-base" />
              Full details
            </Link>
            <Link to={`/books/edit/${book._id}`} className="btn-ghost text-sm">
              <AiOutlineEdit className="text-base" />
              Edit book
            </Link>
            <button type="button" onClick={onClose} className="btn-ghost ml-auto text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Meta = ({ icon, label, value, iconColor }) => (
  <div className="flex items-center gap-3 rounded-xl bg-emerald-950/[0.04] px-4 py-3 ring-1 ring-emerald-950/10">
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/70 text-xl ring-1 ring-emerald-950/10 ${iconColor}`}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <dt className="eyebrow">{label}</dt>
      <dd className="truncate text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  </div>
);

export default BookModal;
