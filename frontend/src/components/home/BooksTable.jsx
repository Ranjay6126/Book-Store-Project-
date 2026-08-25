import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

/* Deterministic accent per row so colours stay stable between renders */
const ACCENTS = [
  "from-indigo-400 to-violet-500",
  "from-sky-400 to-cyan-500",
  "from-fuchsia-400 to-pink-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
];

const initials = (title = "") =>
  title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";

const BooksTable = ({ books }) => {
  const [previewBook, setPreviewBook] = useState(null);

  return (
    <>
    <div className="glass animate-fade-up overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          {/* ---------------- Header ---------------- */}
          <thead>
            <tr className="bg-linear-to-r from-indigo-600/30 via-violet-600/25 to-fuchsia-600/20 backdrop-blur-sm">
              <Th className="w-20 text-center">No</Th>
              <Th>Title</Th>
              <Th className="max-md:hidden">Author</Th>
              <Th className="w-28 text-center max-md:hidden">Year</Th>
              <Th className="w-48 text-center">Operations</Th>
            </tr>
          </thead>

          {/* ---------------- Body ---------------- */}
          <tbody className="divide-y divide-white/6">
            {books.map((book, index) => (
              <tr
                key={book._id}
                className="animate-fade-up group transition-colors duration-300 hover:bg-white/6"
                style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
              >
                {/* index */}
                <td className="px-3 py-3 text-center sm:px-5 sm:py-4">
                  <span className="inline-grid h-8 w-8 place-items-center rounded-lg bg-white/6 text-xs font-bold text-slate-300 ring-1 ring-white/10 tabular-nums transition group-hover:ring-indigo-400/40">
                    {index + 1}
                  </span>
                </td>

                {/* title + avatar */}
                <td className="px-3 py-3 sm:px-5 sm:py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-linear-to-br ${
                        ACCENTS[index % ACCENTS.length]
                      } text-[11px] font-bold text-white shadow-md`}
                    >
                      {initials(book.title)}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-100">
                        {book.title}
                      </p>
                      {/* author shown inline on small screens */}
                      <p className="truncate text-xs text-slate-500 md:hidden">
                        {book.author} · {book.publishYear}
                      </p>
                    </div>
                  </div>
                </td>

                {/* author */}
                <td className="px-3 py-3 text-slate-300 sm:px-5 sm:py-4 max-md:hidden">
                  {book.author}
                </td>

                {/* year */}
                <td className="px-3 py-3 text-center sm:px-5 sm:py-4 max-md:hidden">
                  <span className="rounded-full bg-white/6 px-3 py-1 text-xs font-semibold text-slate-300 ring-1 ring-white/10 tabular-nums">
                    {book.publishYear}
                  </span>
                </td>

                {/* actions */}
                <td className="px-3 py-3 sm:px-5 sm:py-4">
                  <div className="flex items-center justify-center gap-2">
                    <IconAction
                      onClick={() => setPreviewBook(book)}
                      title="Preview book"
                      className="text-indigo-200 hover:bg-indigo-500/20 hover:ring-indigo-400/50"
                    >
                      <BiShow />
                    </IconAction>
                    <LinkAction
                      to={`/books/details/${book._id}`}
                      title="View details"
                      className="text-emerald-300 hover:bg-emerald-500/20 hover:ring-emerald-400/50"
                    >
                      <BsInfoCircle />
                    </LinkAction>
                    <LinkAction
                      to={`/books/edit/${book._id}`}
                      title="Edit book"
                      className="text-amber-300 hover:bg-amber-500/20 hover:ring-amber-400/50"
                    >
                      <AiOutlineEdit />
                    </LinkAction>
                    <LinkAction
                      to={`/books/delete/${book._id}`}
                      title="Delete book"
                      className="text-rose-300 hover:bg-rose-500/20 hover:ring-rose-400/50"
                    >
                      <MdOutlineDelete />
                    </LinkAction>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {previewBook && <BookModal book={previewBook} onClose={() => setPreviewBook(null)} />}
    </>
  );
};

const Th = ({ children, className = "" }) => (
  <th
    scope="col"
    className={`sticky top-0 z-10 bg-[#10173a]/95 px-3 py-3 text-[11px] font-semibold tracking-[0.14em] text-indigo-100/90 uppercase backdrop-blur-md sm:px-5 sm:py-4 ${className}`}
  >
    {children}
  </th>
);

const IconAction = ({ onClick, title, className, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={title}
    className={`grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-base ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </button>
);

const LinkAction = ({ to, title, className, children }) => (
  <Link
    to={to}
    title={title}
    aria-label={title}
    className={`grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-base ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </Link>
);

export default BooksTable;
