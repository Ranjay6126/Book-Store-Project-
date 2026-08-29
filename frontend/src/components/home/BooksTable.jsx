import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const initials = (title = "") => title.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]?.toUpperCase()).join("") || "?";
const BooksTable = ({ books }) => {
  const [previewBook, setPreviewBook] = useState(null);
  return <><div className="animate-fade-up overflow-hidden rounded-lg border border-[#cddbe0] bg-[#fffef9]"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-[#cddbe0] bg-[#eaf6fb] text-[11px] font-bold tracking-[.1em] text-black uppercase"><th className="px-5 py-4">Book</th><th className="hidden px-5 py-4 md:table-cell">Author</th><th className="hidden px-5 py-4 text-center md:table-cell">Year</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-[#d9e2d6]">{books.map((book) => <tr key={book._id} className="group transition hover:bg-[#f1f9ef]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-10 w-8 shrink-0 place-items-center rounded-sm bg-[#607c5d] text-[11px] font-bold text-[#fffdf7] shadow-sm">{initials(book.title)}</span><div className="min-w-0"><p className="truncate font-semibold text-black">{book.title}</p><p className="mt-0.5 truncate text-xs text-black md:hidden">{book.author} · {book.publishYear}</p></div></div></td><td className="hidden px-5 py-4 font-medium text-black md:table-cell">{book.author}</td><td className="hidden px-5 py-4 text-center font-medium text-black md:table-cell">{book.publishYear}</td><td className="px-5 py-4"><div className="flex justify-end gap-1"><Action onClick={() => setPreviewBook(book)} title="Preview"><BiShow /></Action><Action to={`/books/details/${book._id}`} title="Details"><BsInfoCircle /></Action><Action to={`/books/edit/${book._id}`} title="Edit"><AiOutlineEdit /></Action><Action to={`/books/delete/${book._id}`} title="Delete" danger><MdOutlineDelete /></Action></div></td></tr>)}</tbody></table></div></div>{previewBook && <BookModal book={previewBook} onClose={() => setPreviewBook(null)} />}</>;
};
const Action = ({ to, onClick, title, danger, children }) => { const className = `grid h-8 w-8 place-items-center rounded border text-sm font-bold shadow-sm transition ${danger ? "border-[#d9aaa2] bg-[#fff1ee] text-[#7d2f26] hover:bg-[#f9dcd7]" : "border-[#aebfac] bg-[#f3f8f0] text-[#1f3b28] hover:bg-[#dcecd8]"}`; return to ? <Link to={to} aria-label={title} title={title} className={className}>{children}</Link> : <button type="button" onClick={onClick} aria-label={title} title={title} className={className}>{children}</button>; };
export default BooksTable;
