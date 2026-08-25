import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { CardSkeleton, TableSkeleton } from "../components/Spinner";
import BookTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { API_URL } from "../config";

import { MdOutlineAddBox, MdErrorOutline } from "react-icons/md";
import { HiOutlineSearch, HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineTableCells } from "react-icons/hi2";
import { PiBooksDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import { TbCalendarStats, TbArrowsSort } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

const SORTS = {
  newest: { label: "Recently added", fn: (a, b) => (a.createdAt < b.createdAt ? 1 : -1) },
  title: { label: "Title A–Z", fn: (a, b) => (a.title || "").localeCompare(b.title || "") },
  author: { label: "Author A–Z", fn: (a, b) => (a.author || "").localeCompare(b.author || "") },
  yearDesc: { label: "Year, newest", fn: (a, b) => (b.publishYear ?? 0) - (a.publishYear ?? 0) },
  yearAsc: { label: "Year, oldest", fn: (a, b) => (a.publishYear ?? 0) - (b.publishYear ?? 0) },
};

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showType, setShowType] = useState("table");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("newest");

  useEffect(() => {
    let alive = true;

    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_URL}/books`);
        if (alive) setBooks(res.data?.data ?? []);
      } catch (err) {
        console.log("Error fetching books:", err);
        if (alive) setError("Could not reach the server. Is the backend running on port 3000?");
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchBooks();
    return () => {
      alive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const authors = new Set(books.map((b) => (b.author || "").trim().toLowerCase()).filter(Boolean));
    const years = books.map((b) => Number(b.publishYear)).filter((y) => !Number.isNaN(y));
    return {
      total: books.length,
      authors: authors.size,
      newest: years.length ? Math.max(...years) : "—",
    };
  }, [books]);

  const visibleBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? books.filter(
          (b) =>
            (b.title || "").toLowerCase().includes(q) ||
            (b.author || "").toLowerCase().includes(q) ||
            String(b.publishYear ?? "").includes(q),
        )
      : books;
    return [...filtered].sort(SORTS[sortKey].fn);
  }, [books, query, sortKey]);

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col px-3 pt-2 pb-3 sm:px-4 sm:pt-4 sm:pb-5">
      {/* ================= Stat strip (fixed) ================= */}
      <section className="animate-fade-up mb-2 grid shrink-0 grid-cols-3 gap-2 sm:mb-3.5 sm:gap-4">
        <StatCard
          icon={<PiBooksDuotone />}
          value={stats.total}
          label="Books in library"
          tint="from-indigo-500/25 to-indigo-500/0"
          ring="ring-indigo-400/30"
          iconColor="text-indigo-300"
        />
        <StatCard
          icon={<PiUsersThreeDuotone />}
          value={stats.authors}
          label="Unique authors"
          tint="from-fuchsia-500/25 to-fuchsia-500/0"
          ring="ring-fuchsia-400/30"
          iconColor="text-fuchsia-300"
          delay="90ms"
        />
        <StatCard
          icon={<TbCalendarStats />}
          value={stats.newest}
          label="Latest publish year"
          tint="from-sky-500/25 to-sky-500/0"
          ring="ring-sky-400/30"
          iconColor="text-sky-300"
          delay="180ms"
        />
      </section>

      {/* ============================================================
          Books List heading  +  Table / Card view toggle
          (both on the same level, as requested)
          ============================================================ */}
      <section
        className="animate-fade-up mb-2 flex shrink-0 flex-wrap items-center justify-between gap-2 sm:mb-3.5"
        style={{ animationDelay: "120ms" }}
      >
        {/* Heading */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-linear-to-br from-indigo-500/30 to-fuchsia-500/20 ring-1 ring-white/15 sm:h-11 sm:w-11 sm:rounded-xl">
            <PiBooksDuotone className="text-xl text-indigo-200 sm:text-2xl" />
          </span>

          <div className="min-w-0">
            <h1 className="text-gradient text-xl font-bold tracking-tight sm:text-3xl">
              Books List
            </h1>
            <p className="mt-0.5 truncate text-xs text-slate-400 sm:text-sm">
              {loading
                ? "Fetching your collection…"
                : `${visibleBooks.length} of ${stats.total} ${
                    stats.total === 1 ? "book" : "books"
                  } shown`}
            </p>
          </div>
        </div>

        {/* Toggle + add */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* segmented control */}
          <div
            role="tablist"
            aria-label="Choose how to display the books"
            className="glass flex items-center gap-1 rounded-full p-1.5"
          >
            <ViewTab
              active={showType === "table"}
              onClick={() => setShowType("table")}
              icon={<HiOutlineTableCells className="text-lg" />}
              label="Table View"
            />
            <ViewTab
              active={showType === "card"}
              onClick={() => setShowType("card")}
              icon={<HiOutlineViewGrid className="text-lg" />}
              label="Card View"
            />
          </div>

          <Link to="/books/create" className="btn-primary text-sm">
            <MdOutlineAddBox className="text-xl" />
            Add Book
          </Link>
        </div>
      </section>

      {/* ================= Search + sort ================= */}
      <section
        className="animate-fade-up glass mb-2 flex shrink-0 flex-col gap-2 rounded-2xl p-2 sm:mb-4 sm:flex-row sm:items-center sm:gap-3 sm:p-2.5"
        style={{ animationDelay: "180ms" }}
      >
        <div className="relative flex-1">
          <HiOutlineSearch className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author or year…"
            aria-label="Search books"
            className="field pr-11 pl-11"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <IoClose />
            </button>
          )}
        </div>

        <div className="relative sm:w-60">
          <TbArrowsSort className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-slate-500" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            aria-label="Sort books"
            className="field cursor-pointer appearance-none pr-10 pl-11"
          >
            {Object.entries(SORTS).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-ink-900 text-slate-100">
                {label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-500">
            ▾
          </span>
        </div>
      </section>

      {/* ======== Content — scrolls up/down under the fixed header ======== */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-0.5 sm:pr-1">
      {loading ? (
        showType === "table" ? (
          <TableSkeleton />
        ) : (
          <CardSkeleton />
        )
      ) : error ? (
        <EmptyState
          icon={<MdErrorOutline />}
          title="Something went wrong"
          body={error}
          danger
        />
      ) : visibleBooks.length === 0 ? (
        query ? (
          <EmptyState
            icon={<HiOutlineSearch />}
            title="No matches found"
            body={`Nothing in your library matches “${query}”. Try a different title, author or year.`}
            action={
              <button onClick={() => setQuery("")} className="btn-ghost text-sm">
                Clear search
              </button>
            }
          />
        ) : (
          <EmptyState
            icon={<PiBooksDuotone />}
            title="Your library is empty"
            body="Add your first book and it will show up here straight away."
            action={
              <Link to="/books/create" className="btn-primary text-sm">
                <MdOutlineAddBox className="text-xl" />
                Add your first book
              </Link>
            }
          />
        )
      ) : showType === "table" ? (
        <BookTable books={visibleBooks} />
      ) : (
        <BooksCard books={visibleBooks} />
      )}
      </div>
    </div>
  );
};

/* ---------------- small local pieces ---------------- */

const StatCard = ({ icon, value, label, tint, ring, iconColor, delay = "0ms" }) => (
  <div
    className="glass glass-hover animate-fade-up relative overflow-hidden rounded-lg px-2 py-1 sm:rounded-xl sm:px-3.5 sm:py-1.5"
    style={{ animationDelay: delay }}
  >
    <div
      aria-hidden="true"
      className={`absolute inset-0 bg-linear-to-br ${tint} opacity-70`}
    />
    <div className="relative flex min-w-0 items-center gap-1.5 sm:gap-2">
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md bg-white/8 text-xs ring-1 sm:h-7 sm:w-7 sm:rounded-lg sm:text-base ${ring} ${iconColor}`}
      >
        {icon}
      </span>
      <p className="shrink-0 text-xs font-bold text-white tabular-nums sm:text-base">{value}</p>
      <p className="eyebrow truncate text-[9px] sm:text-[11px]">{label}</p>
    </div>
  </div>
);

const ViewTab = ({ active, onClick, icon, label }) => (
  <button
    role="tab"
    type="button"
    aria-selected={active}
    onClick={onClick}
    className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-300 sm:gap-2 sm:px-5 sm:py-2 sm:text-sm ${
      active
        ? "bg-linear-to-r from-emerald-600 to-green-500 text-white shadow-[0_10px_24px_-10px_rgba(22,163,74,0.9),inset_0_1px_0_0_rgba(255,255,255,0.25)]"
        : "text-slate-400 hover:bg-white/8 hover:text-white"
    }`}
  >
    {icon}
    {label}
  </button>
);

const EmptyState = ({ icon, title, body, action, danger = false }) => (
  <div className="glass animate-pop flex flex-col items-center rounded-3xl px-6 py-20 text-center">
    <span
      className={`grid h-20 w-20 place-items-center rounded-2xl text-4xl ring-1 ${
        danger
          ? "bg-red-500/12 text-red-300 ring-red-400/30"
          : "bg-indigo-500/12 text-indigo-300 ring-indigo-400/30"
      }`}
    >
      {icon}
    </span>
    <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
    <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">{body}</p>
    {action && <div className="mt-7">{action}</div>}
  </div>
);

export default Home;
