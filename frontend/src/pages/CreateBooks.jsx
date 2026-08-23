import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import BackButton from "../components/BackButton";
import PageHeading from "../components/PageHeading";
import TextField from "../components/TextField";
import { API_URL } from "../config";

import { MdOutlineAddBox } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { TbCalendarStats } from "react-icons/tb";
import { FiSave } from "react-icons/fi";
import { MdOutlineDescription, MdOutlineImage } from "react-icons/md";

const CURRENT_YEAR = new Date().getFullYear();

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validate = () => {
    const next = {};

    if (!title.trim()) next.title = "Title is required.";
    if (!author.trim()) next.author = "Author is required.";

    if (!String(publishYear).trim()) {
      next.publishYear = "Publish year is required.";
    } else if (!/^\d{1,4}$/.test(String(publishYear).trim())) {
      next.publishYear = "Enter a numeric year, e.g. 2024.";
    } else {
      const year = Number(publishYear);
      if (year < 1 || year > CURRENT_YEAR + 1) {
        next.publishYear = `Year must be between 1 and ${CURRENT_YEAR + 1}.`;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSaveBook = async () => {
    if (!validate()) {
      enqueueSnackbar("Please fix the highlighted fields.", { variant: "warning" });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/books`, {
        title: title.trim(),
        author: author.trim(),
        publishYear: Number(publishYear),
        description: description.trim(),
        coverImage,
      });
      enqueueSnackbar("Book created successfully!", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      enqueueSnackbar(
        error.response?.data?.message || "Could not create the book. Please try again.",
        { variant: "error" },
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      enqueueSnackbar("Please select an image file.", { variant: "warning" });
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      enqueueSnackbar("Please choose an image smaller than 3 MB.", { variant: "warning" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCoverImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleSaveBook();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      <BackButton />

      <div className="mt-7">
        <PageHeading
          icon={<MdOutlineAddBox />}
          eyebrow="New entry"
          title="Create Book"
          subtitle="Add a title to your library. All three fields are required."
          tone="indigo"
        />
      </div>

      <div
        className="glass animate-fade-up relative overflow-hidden rounded-3xl p-7 sm:p-9"
        style={{ animationDelay: "80ms" }}
        onKeyDown={onKeyDown}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-400 via-fuchsia-400 to-sky-400"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <div className="relative space-y-6">
          <TextField
            id="title"
            label="Title"
            icon={<PiBookOpenTextLight />}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            placeholder="e.g. Atomic Habits"
            autoFocus
          />

          <TextField
            id="author"
            label="Author"
            icon={<BiUserCircle />}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={errors.author}
            placeholder="e.g. James Clear"
          />

          <TextField
            id="publishYear"
            label="Publish Year"
            icon={<TbCalendarStats />}
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            error={errors.publishYear}
            hint={`Any year up to ${CURRENT_YEAR + 1}.`}
            inputMode="numeric"
            maxLength={4}
            placeholder="e.g. 2018"
          />

          <div>
            <label htmlFor="coverImage" className="mb-2 block text-sm font-semibold text-slate-300">
              Upload book cover
            </label>
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/4 p-4">
              {coverImage ? (
                <img src={coverImage} alt="Selected book cover" className="h-28 w-20 rounded-lg object-cover ring-1 ring-white/15" />
              ) : (
                <span className="grid h-28 w-20 place-items-center rounded-lg bg-white/6 text-3xl text-slate-500 ring-1 ring-white/10"><MdOutlineImage /></span>
              )}
              <div>
                <input id="coverImage" type="file" accept="image/*" onChange={handleCoverChange} className="block text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-500/25 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-100 hover:file:bg-indigo-500/40" />
                <p className="mt-2 text-xs text-slate-500">Optional JPG, PNG, or WebP, up to 3 MB.</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-300">Describe the book</label>
            <div className="relative">
              <MdOutlineDescription className="pointer-events-none absolute top-4 left-4 text-lg text-slate-500" />
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={1000} rows={4} placeholder="Write a short description of this book…" className="field resize-y py-3 pr-4 pl-11" />
            </div>
            <p className="mt-2 text-xs text-slate-500">Optional. This appears in the book preview.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={handleSaveBook}
              disabled={loading}
              className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="animate-spin-slow h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                  Saving…
                </>
              ) : (
                <>
                  <FiSave className="text-base" />
                  Save Book
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              disabled={loading}
              className="btn-ghost text-sm disabled:opacity-60"
            >
              Cancel
            </button>

            <p className="ml-auto hidden text-xs text-slate-500 sm:block">
              Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-sans">Enter</kbd> to save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
