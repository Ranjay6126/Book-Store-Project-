import { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";

const PALETTE = ["#6b845f", "#9d7155", "#647d87", "#806b85", "#9d8151"];
const BookSingleCard = ({ book, index = 0 }) => {
  const [showModal, setShowModal] = useState(false); const shade = PALETTE[index % PALETTE.length];
  return <><article className="animate-fade-up overflow-hidden rounded-lg border border-[#bdcfb9] bg-[#fffef9] transition hover:-translate-y-0.5 hover:shadow-lg"><div className="h-1" style={{ backgroundColor: shade }} /><div className="p-5"><div className="flex gap-4"><div className="grid h-28 w-20 shrink-0 place-items-center rounded-sm text-[#fffdf7] shadow-md" style={{ backgroundColor: shade }}>{book.coverImage ? <img src={book.coverImage} alt={`${book.title} cover`} className="h-full w-full rounded-sm object-cover" /> : <PiBookOpenTextLight className="text-3xl" />}</div><div className="min-w-0"><p className="eyebrow !text-black">{book.publishYear}</p><h2 className="mt-2 line-clamp-2 font-serif text-xl font-bold leading-tight text-black">{book.title}</h2><p className="mt-2 text-sm font-medium text-black">{book.author}</p>{book.genre && <p className="mt-3 text-xs font-bold tracking-wide text-black uppercase">{book.genre}</p>}</div></div>{book.description && <p className="mt-5 line-clamp-2 text-sm leading-6 text-black">{book.description}</p>}<div className="mt-5 flex items-center border-t border-[#cbdac7] pt-3"><button type="button" onClick={() => setShowModal(true)} className="mr-auto inline-flex min-w-28 items-center justify-center gap-1.5 rounded border border-[#8eaa8b] bg-[#edf8e9] px-3 py-2 text-sm font-bold text-black shadow-sm transition hover:bg-[#d9eed3]"><BiShow /> Preview</button><SmallAction to={`/books/details/${book._id}`} title="Details"><BsInfoCircle /></SmallAction><SmallAction to={`/books/edit/${book._id}`} title="Edit"><AiOutlineEdit /></SmallAction><SmallAction to={`/books/delete/${book._id}`} title="Delete" danger><MdOutlineDelete /></SmallAction></div></div></article>{showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}</>;
};
const SmallAction = ({ to, title, danger, children }) => <Link to={to} title={title} aria-label={title} className={`ml-1 grid h-8 w-8 place-items-center rounded border text-sm font-bold shadow-sm transition ${danger ? "border-[#d9aaa2] bg-[#fff1ee] text-[#7d2f26] hover:bg-[#f9dcd7]" : "border-[#aebfac] bg-[#f3f8f0] text-[#1f3b28] hover:bg-[#dcecd8]"}`}>{children}</Link>;
export default BookSingleCard;
