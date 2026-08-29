import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardSkeleton, TableSkeleton } from "../components/Spinner";
import BookTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { API_URL } from "../config";
import { MdOutlineAdd, MdErrorOutline } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { PiBookOpenTextLight } from "react-icons/pi";

const SORTS = {
  newest: { label: "Recently added", fn: (a, b) => (a.createdAt < b.createdAt ? 1 : -1) },
  title: { label: "Title A–Z", fn: (a, b) => (a.title || "").localeCompare(b.title || "") },
  author: { label: "Author A–Z", fn: (a, b) => (a.author || "").localeCompare(b.author || "") },
  yearDesc: { label: "Newest publication", fn: (a, b) => (b.publishYear ?? 0) - (a.publishYear ?? 0) },
};

const Home = () => {
  const [books, setBooks] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState("");
  const [showType, setShowType] = useState("table"), [query, setQuery] = useState(""), [sortKey, setSortKey] = useState("newest");
  useEffect(() => { let alive = true; (async () => { setLoading(true); try { const res = await axios.get(`${API_URL}/books`); if (alive) setBooks(res.data?.data ?? []); } catch { if (alive) setError("Could not reach the library server. Please try again in a moment."); } finally { if (alive) setLoading(false); } })(); return () => { alive = false; }; }, []);
  const stats = useMemo(() => ({ total: books.length, authors: new Set(books.map((book) => book.author?.trim().toLowerCase()).filter(Boolean)).size, latest: books.length ? Math.max(...books.map((book) => Number(book.publishYear) || 0)) : "—" }), [books]);
  const visibleBooks = useMemo(() => { const needle = query.trim().toLowerCase(); const filtered = needle ? books.filter((book) => [book.title, book.author, book.publishYear].some((value) => String(value ?? "").toLowerCase().includes(needle))) : books; return [...filtered].sort(SORTS[sortKey].fn); }, [books, query, sortKey]);
  return <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-11">
    <section className="animate-fade-up border-b border-[#9fbc99] pb-6"><h1 className="flex items-center gap-2 font-serif text-4xl font-bold tracking-tight text-[#17231a] sm:text-5xl"><PiBookOpenTextLight className="shrink-0 text-3xl sm:text-4xl" />Your library Collection</h1><div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><p className="max-w-3xl text-sm font-medium leading-6 text-[#1e3024]">The Book Store System allows users to view, add, edit, and delete books. A confirmation warning is shown before deletion, as deleted books cannot be recovered.</p><div className="shrink-0"><p className="mb-3 text-center text-sm font-bold text-black lg:-translate-x-5">{loading ? "Loading books…" : `${visibleBooks.length} ${visibleBooks.length === 1 ? "title" : "titles"}`}</p><div className="flex flex-wrap items-center gap-2"><div className="flex min-w-[278px] justify-center gap-2 rounded-md border border-[#94ac91] bg-[#dcefd8] p-1"><ViewButton active={showType === "table"} onClick={() => setShowType("table")} label="Table view" /><ViewButton active={showType === "card"} onClick={() => setShowType("card")} label="Card view" /></div><Link to="/books/create" className="btn-primary rounded-full text-sm"><MdOutlineAdd className="text-lg" /> Add book</Link></div></div></div></section>
    <section className="animate-fade-up mt-6 grid grid-cols-3 divide-x divide-[#cbd5c5] overflow-hidden rounded-lg border border-[#cbd5c5] bg-[#fafff7]"><Stat value={stats.total} label="Books" /><Stat value={stats.authors} label="Authors" /><Stat value={stats.latest} label="Latest year" /></section>
    <section className="animate-fade-up mt-4 grid gap-3 rounded-lg border border-[#9fbc99] bg-[#c7dfc0] p-3 shadow-sm sm:grid-cols-[1fr_220px]"><label className="relative"><HiOutlineSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-black" /><input className="field bg-[#f8fff5] pl-10" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author, or year" aria-label="Search books" /></label><select className="field cursor-pointer bg-[#f8fff5]" value={sortKey} onChange={(event) => setSortKey(event.target.value)} aria-label="Sort books">{Object.entries(SORTS).map(([key, sort]) => <option key={key} value={key}>{sort.label}</option>)}</select></section>
    <div className="mt-5">{loading ? (showType === "table" ? <TableSkeleton /> : <CardSkeleton />) : error ? <Empty icon={<MdErrorOutline />} title="Something went wrong" body={error} /> : visibleBooks.length ? (showType === "table" ? <BookTable books={visibleBooks} /> : <BooksCard books={visibleBooks} />) : <Empty icon={<HiOutlineSearch />} title={query ? "No titles found" : "Your shelves are empty"} body={query ? "Try a different title, author, or year." : "Add your first book to start your collection."} action={!query && <Link to="/books/create" className="btn-primary text-sm">Add a book</Link>} />}</div>
  </div>;
};
const Stat = ({ value, label }) => <div className="px-4 py-4 text-center sm:px-6"><p className="font-serif text-2xl font-bold text-[#203125] sm:text-3xl">{value}</p><p className="mt-1 text-[11px] font-bold tracking-[.11em] text-[#33463a] uppercase">{label}</p></div>;
const ViewButton = ({ active, onClick, label }) => <button type="button" onClick={onClick} className={`min-w-32 rounded-full px-5 py-2 text-sm font-bold transition ${active ? "bg-[#c9dec4] text-black" : "text-black hover:bg-[#dcebd7]"}`}>{label}</button>;
const Empty = ({ icon, title, body, action }) => <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-[#cbd0c5] bg-[#fbfaf5] px-6 text-center"><span className="text-3xl text-[#637a60]">{icon}</span><h3 className="mt-4 font-serif text-xl font-bold text-[#314136]">{title}</h3><p className="mt-2 text-sm text-[#718077]">{body}</p>{action && <div className="mt-5">{action}</div>}</div>;
export default Home;
