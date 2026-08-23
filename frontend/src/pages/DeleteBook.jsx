import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import BackButton from "../components/BackButton";
import PageHeading from "../components/PageHeading";
import Spinner from "../components/Spinner";
import { API_URL } from "../config";

import { MdOutlineDelete, MdErrorOutline } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { TbCalendarStats } from "react-icons/tb";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    let alive = true;

    axios
      .get(`${API_URL}/books/${id}`)
      .then((res) => {
        if (alive) setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (alive) setError("Could not load this book. It may already have been deleted.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      enqueueSnackbar("Book deleted successfully.", { variant: "success" });
      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
      enqueueSnackbar(
        err.response?.data?.message || "Could not delete the book. Please try again.",
        { variant: "error" },
      );
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <BackButton />

      <div className="mt-7">
        <PageHeading
          icon={<MdOutlineDelete />}
          eyebrow="Danger zone"
          title="Delete Book"
          subtitle="This permanently removes the record. It cannot be undone."
          tone="rose"
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
          <h3 className="mt-5 text-lg font-semibold text-emerald-950">Not available</h3>
          <p className="mt-2 text-sm text-emerald-950/70">{error}</p>
          <Link to="/" className="btn-ghost mt-6 text-sm">
            Back to library
          </Link>
        </div>
      ) : (
        book && (
          <div className="glass animate-fade-up relative overflow-hidden rounded-3xl">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-rose-400 via-red-500 to-orange-400"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-14 h-56 w-56 rounded-full bg-rose-500/18 blur-3xl"
            />

            {/* warning banner */}
            <div className="relative flex items-start gap-3 border-b border-emerald-950/10 bg-rose-500/10 p-6 sm:px-9">
              <HiOutlineExclamationTriangle className="mt-0.5 shrink-0 text-2xl text-rose-600" />
              <div>
                <p className="font-semibold text-rose-900">
                  You're about to delete this book
                </p>
                <p className="mt-1 text-sm text-rose-800/80">
                  The record below will be removed from your library permanently.
                </p>
              </div>
            </div>

            {/* the record */}
            <div className="relative space-y-3 p-7 sm:p-9">
              <Row
                icon={<PiBookOpenTextLight />}
                label="Title"
                value={book.title}
                iconColor="text-mint-700"
              />
              <Row
                icon={<BiUserCircle />}
                label="Author"
                value={book.author}
                iconColor="text-pink-700"
              />
              <Row
                icon={<TbCalendarStats />}
                label="Publish year"
                value={book.publishYear}
                iconColor="text-amber-700"
              />

              {/* acknowledgement */}
              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl bg-emerald-950/[0.04] px-4 py-3.5 ring-1 ring-emerald-950/10 transition hover:bg-emerald-950/[0.07]">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-rose-500"
                />
                <span className="text-sm text-emerald-950/80">
                  I understand this action is permanent and cannot be undone.
                </span>
              </label>
            </div>

            {/* actions */}
            <div className="flex flex-wrap items-center gap-3 border-t border-emerald-950/10 p-7 pt-6 sm:px-9">
              <button
                type="button"
                onClick={handleDelete}
                disabled={!acknowledged || deleting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-rose-600 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_rgba(225,29,72,0.9),inset_0_1px_0_0_rgba(255,255,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:shadow-none disabled:brightness-100 disabled:hover:translate-y-0"
              >
                {deleting ? (
                  <>
                    <span className="animate-spin-slow h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <MdOutlineDelete className="text-base" />
                    Delete permanently
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={deleting}
                className="btn-ghost text-sm disabled:opacity-60"
              >
                Keep this book
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const Row = ({ icon, label, value, iconColor }) => (
  <div className="flex items-start gap-3 rounded-xl bg-emerald-950/[0.04] px-4 py-3.5 ring-1 ring-emerald-950/10">
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/70 text-xl ring-1 ring-emerald-950/10 ${iconColor}`}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <p className="eyebrow">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

export default DeleteBook;
