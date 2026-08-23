import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import BackButton from "../components/BackButton";
import PageHeading from "../components/PageHeading";
import Spinner from "../components/Spinner";
import { API_URL } from "../config";

import { BsInfoCircle } from "react-icons/bs";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { TbCalendarStats, TbClockPlus, TbClockEdit, TbBooks } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete, MdErrorOutline } from "react-icons/md";
import { HiOutlineHashtag } from "react-icons/hi";

const fmt = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
};

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    let alive = true;

    axios
      .get(`${API_URL}/books/${id}`)
      .then((response) => {
        if (alive) setBook(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (alive) setError("Could not load this book. It may have been deleted.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      <BackButton />

      <div className="mt-7">
        <PageHeading
          icon={<BsInfoCircle />}
          eyebrow="Book record"
          title="Book Details"
          subtitle="Everything stored against this title."
          tone="emerald"
        />
      </div>

      {loading ? (
        <div className="glass rounded-3xl">
          <Spinner label="Loading book details…" />
        </div>
      ) : error ? (
        <div className="glass animate-pop flex flex-col items-center rounded-3xl px-6 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-red-500/12 text-3xl text-red-300 ring-1 ring-red-400/30">
            <MdErrorOutline />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-white">Not available</h3>
          <p className="mt-2 text-sm text-slate-400">{error}</p>
          <Link to="/" className="btn-ghost mt-6 text-sm">
            Back to library
          </Link>
        </div>
      ) : (
        <div className="glass animate-fade-up relative overflow-hidden rounded-3xl">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-400 via-teal-400 to-sky-400"
          />

          {/* hero */}
          <div className="relative border-b border-white/10 bg-linear-to-br from-white/6 to-transparent p-7 sm:p-9">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-12 h-52 w-52 rounded-full bg-emerald-500/18 blur-3xl"
            />

            <div className="relative flex items-start gap-4">
              {book.coverImage ? <img src={book.coverImage} alt={`${book.title} cover`} className="h-24 w-16 shrink-0 rounded-lg object-cover shadow-lg ring-1 ring-white/20" /> : <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg"><PiBookOpenTextLight className="text-3xl text-white" /></span>}

              <div className="min-w-0">
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-white">
                  {book.title}
                </h2>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
                  <BiUserCircle className="text-base" />
                  {book.author}
                  <span className="text-slate-600">•</span>
                  <span className="tabular-nums">{book.publishYear}</span>
                </p>
              </div>
            </div>
          </div>

          {/* details */}
          <dl className="relative grid gap-3 p-7 sm:grid-cols-2 sm:p-9">
            <Row
              icon={<PiBookOpenTextLight />}
              label="Title"
              value={book.title}
              iconColor="text-indigo-300"
            />
            <Row
              icon={<BiUserCircle />}
              label="Author"
              value={book.author}
              iconColor="text-sky-300"
            />
            <Row
              icon={<TbCalendarStats />}
              label="Publish year"
              value={book.publishYear}
              iconColor="text-fuchsia-300"
            />
            <Row icon={<PiBookOpenTextLight />} label="Genre" value={book.genre || "General"} iconColor="text-violet-300" />
            <Row icon={<TbBooks />} label="Book length" value={book.pages ? `${book.pages} pages` : "—"} iconColor="text-amber-300" />
            <Row
              icon={<HiOutlineHashtag />}
              label="Record ID"
              value={book._id}
              iconColor="text-slate-300"
              mono
            />
            <Row
              icon={<TbClockPlus />}
              label="Created at"
              value={fmt(book.createdAt)}
              iconColor="text-emerald-300"
            />
            <Row
              icon={<TbClockEdit />}
              label="Updated at"
              value={fmt(book.updatedAt)}
              iconColor="text-amber-300"
            />
          </dl>

          {(book.description || book.story) && <section className="border-t border-white/10 p-7 sm:p-9"><h3 className="text-lg font-semibold text-white">About this book</h3>{book.description && <p className="mt-2 text-sm leading-relaxed text-slate-300">{book.description}</p>}{book.story && <div className="mt-5 space-y-5"><h3 className="text-lg font-semibold text-white">Story preview</h3>{book.story.split(/\n\s*---PAGE---\s*\n/).map((page, index) => <article key={index} className="rounded-xl bg-white/4 p-4 ring-1 ring-white/8"><p className="eyebrow">Page {index + 1}</p><p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-300">{page}</p></article>)}</div>}</section>}

          {/* actions */}
          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 p-7 pt-6 sm:px-9">
            <Link to={`/books/edit/${book._id}`} className="btn-primary text-sm">
              <AiOutlineEdit className="text-base" />
              Edit book
            </Link>
            <Link
              to={`/books/delete/${book._id}`}
              className="btn-ghost text-sm text-rose-200 hover:border-rose-400/50 hover:bg-rose-500/15 hover:text-white"
            >
              <MdOutlineDelete className="text-base" />
              Delete
            </Link>
            <Link to="/" className="btn-ghost ml-auto text-sm">
              Back to library
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const Row = ({ icon, label, value, iconColor, mono = false }) => (
  <div className="flex items-start gap-3 rounded-xl bg-white/4 px-4 py-3.5 ring-1 ring-white/8 transition-colors duration-300 hover:bg-white/6">
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/6 text-xl ring-1 ring-white/10 ${iconColor}`}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <dt className="eyebrow">{label}</dt>
      <dd
        className={`mt-0.5 text-sm font-semibold text-slate-100 ${
          mono ? "font-mono text-xs break-all text-slate-400" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  </div>
);

export default ShowBook;
