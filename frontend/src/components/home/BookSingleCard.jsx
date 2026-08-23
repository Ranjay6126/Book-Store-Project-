import { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { TbBooks } from "react-icons/tb";
import BookModal from "./BookModal";

const ACCENTS = [
  { spine: "from-indigo-400 to-violet-500", glow: "group-hover:shadow-indigo-500/40" },
  { spine: "from-sky-400 to-cyan-500", glow: "group-hover:shadow-sky-500/40" },
  { spine: "from-fuchsia-400 to-pink-500", glow: "group-hover:shadow-fuchsia-500/40" },
  { spine: "from-emerald-400 to-teal-500", glow: "group-hover:shadow-emerald-500/40" },
  { spine: "from-amber-400 to-orange-500", glow: "group-hover:shadow-amber-500/40" },
];

const BookSingleCard = ({ book, index = 0 }) => {
  const [showModal, setShowModal] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <>
      <article
        className="glass glass-hover group animate-fade-up relative flex flex-col overflow-hidden rounded-2xl"
        style={{ animationDelay: `${Math.min(index, 12) * 55}ms` }}
      >
        {/* coloured book spine down the left edge */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-1 bg-linear-to-b ${accent.spine}`}
        />

        {/* soft top sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-linear-to-br from-white/12 to-transparent blur-2xl"
        />

        <div className="relative flex flex-1 flex-col p-6 pl-7">
          {/* year pill */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <p className="eyebrow truncate" title={book._id}>
              ID {String(book._id).slice(-8)}
            </p>
            <span className="shrink-0 rounded-full bg-linear-to-r from-indigo-500/25 to-fuchsia-500/25 px-3 py-1 text-xs font-bold text-indigo-100 ring-1 ring-white/15 tabular-nums">
              {book.publishYear}
            </span>
          </div>

          {/* cover + title */}
          <div className="flex items-start gap-3">
            {book.coverImage ? (
              <img src={book.coverImage} alt={`${book.title} cover`} className="h-28 w-20 shrink-0 rounded-lg object-cover shadow-lg ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-[1.03]" />
            ) : (
              <span className={`grid h-28 w-20 shrink-0 place-items-center rounded-xl bg-linear-to-br ${accent.spine} shadow-lg`}><PiBookOpenTextLight className="text-3xl text-white" /></span>
            )}
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-lg leading-snug font-bold tracking-tight text-white" title={book.title}>{book.title}</h2>
              {book.genre && <p className="mt-2 text-xs font-semibold tracking-wide text-indigo-200 uppercase">{book.genre}</p>}
              {book.pages && <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400"><TbBooks /> {book.pages} pages</p>}
            </div>
          </div>

          {/* author */}
          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
              <BiUserCircle className="text-xl text-slate-300" />
            </span>
            <p className="truncate text-sm font-medium text-slate-300" title={book.author}>
              {book.author}
            </p>
          </div>

          {book.description && <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-400">{book.description}</p>}

          {/* actions */}
          <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              title="Quick preview"
              aria-label="Quick preview"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs font-semibold text-slate-200 ring-1 ring-white/10 transition-all duration-300 hover:bg-indigo-500/20 hover:text-white hover:ring-indigo-400/50"
            >
              <BiShow className="text-base" />
              Preview
            </button>

            <CardAction
              to={`/books/details/${book._id}`}
              title="View details"
              className="text-emerald-300 hover:bg-emerald-500/20 hover:ring-emerald-400/50"
            >
              <BsInfoCircle />
            </CardAction>

            <CardAction
              to={`/books/edit/${book._id}`}
              title="Edit book"
              className="text-amber-300 hover:bg-amber-500/20 hover:ring-amber-400/50"
            >
              <AiOutlineEdit />
            </CardAction>

            <CardAction
              to={`/books/delete/${book._id}`}
              title="Delete book"
              className="text-rose-300 hover:bg-rose-500/20 hover:ring-rose-400/50"
            >
              <MdOutlineDelete />
            </CardAction>
          </div>
        </div>
      </article>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </>
  );
};

const CardAction = ({ to, title, className, children }) => (
  <Link
    to={to}
    title={title}
    aria-label={title}
    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-base ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </Link>
);

export default BookSingleCard;
