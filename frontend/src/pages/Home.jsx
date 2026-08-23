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
    <div className="mx-auto max-w-7xl px-4 pb-20">
      {/* ================= Stat strip ================= */}
      <section className="animate-fade-up mb-9 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<PiBooksDuotone />}
          value={stats.total}
          label="Books in library"
          tint="from-mint-500/30 to-mint-500/0"
          ring="ring-mint-600/30"
          iconColor="text-mint-700"
        />
        <StatCard
          icon={<PiUsersThreeDuotone />}
          value={stats.authors}
          label="Unique authors"
          tint="from-blush-300/45 to-blush-300/0"
          ring="ring-blush-500/40"
          iconColor="text-pink-700"
          delay="90ms"
        />
        <StatCard
          icon={<TbCalendarStats />}
          value={stats.newest}
          label="Latest publish year"
          tint="from-accent-400/40 to-accent-400/0"
          ring="ring-amber-500/40"
          iconColor="text-amber-700"
          delay="180ms"
        />
      </section>

      {/* ============================================================
          Books List heading  +  Table / Card view toggle
          (both on the same level, as requested)
          ============================================================ */}
      <section
        className="animate-fade-up mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        style={{ animationDelay: "120ms" }}
      >
        {/* Heading */}
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-mint-400/45 to-blush-300/50 ring-1 ring-white/70">
            <PiBooksDuotone className="text-2xl text-emerald-900" />
          </span>

          <div>
            <h1 className="text-gradient text-2xl font-bold tracking-tight sm:text-3xl">
              Books List
            </h1>
            <p className="mt-0.5 text-sm text-emerald-950/70">
              {loading
                ? "Fetching your collection…"
                : `${visibleBooks.length} of ${stats.total} ${
                    stats.total === 1 ? "book" : "books"
                  } shown`}
            </p>
          </div>
        </div>

        {/* Toggle + add */}
        <div className="flex flex-wrap items-center gap-3">
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
        className="animate-fade-up glass mb-8 flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center"
        style={{ animationDelay: "180ms" }}
      >
        <div className="relative flex-1">
          <HiOutlineSearch className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-emerald-900/50" />
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
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 text-emerald-950/60 transition hover:bg-emerald-950/10 hover:text-emerald-950"
            >
              <IoClose />
            </button>
          )}
        </div>

        <div className="relative sm:w-60">
          <TbArrowsSort className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-emerald-900/50" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            aria-label="Sort books"
            className="field cursor-pointer appearance-none pr-10 pl-11"
          >
            {Object.entries(SORTS).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-white text-emerald-950">
                {label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-emerald-900/60">
            ▾
          </span>
        </div>
      </section>

      {/* ================= Content ================= */}
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
  );
};

/* ---------------- small local pieces ---------------- */

const StatCard = ({ icon, value, label, tint, ring, iconColor, delay = "0ms" }) => (
  <div
    className="glass glass-hover animate-fade-up relative overflow-hidden rounded-2xl p-5"
    style={{ animationDelay: delay }}
  >
    <div
      aria-hidden="true"
      className={`absolute inset-0 bg-linear-to-br ${tint} opacity-70`}
    />
    <div className="relative flex items-center gap-4">
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/60 text-2xl ring-1 ${ring} ${iconColor}`}
      >
        {icon}
      </span>
      <div>
        <p className="text-2xl font-bold text-emerald-950 tabular-nums">{value}</p>
        <p className="eyebrow mt-0.5">{label}</p>
      </div>
    </div>
  </div>
);

const ViewTab = ({ active, onClick, icon, label }) => (
  <button
    role="tab"
    type="button"
    aria-selected={active}
    onClick={onClick}
    className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 sm:px-5 ${
      active
        ? "bg-linear-to-r from-mint-600 to-teal-500 text-white shadow-[0_10px_24px_-10px_rgba(18,138,76,0.7),inset_0_1px_0_0_rgba(255,255,255,0.25)]"
        : "text-emerald-950/60 hover:bg-white/60 hover:text-emerald-950"
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
          ? "bg-red-500/15 text-red-600 ring-red-400/40"
          : "bg-mint-400/20 text-mint-700 ring-mint-500/35"
      }`}
    >
      {icon}
    </span>
    <h3 className="mt-6 text-xl font-semibold text-emerald-950">{title}</h3>
    <p className="mt-2 max-w-md text-sm leading-relaxed text-emerald-950/70">{body}</p>
    {action && <div className="mt-7">{action}</div>}
  </div>
);

export default Home;
