import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import BackButton from "../components/BackButton";
import PageHeading from "../components/PageHeading";
import TextField from "../components/TextField";
import Spinner from "../components/Spinner";
import { API_URL } from "../config";

import { AiOutlineEdit } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { TbCalendarStats } from "react-icons/tb";
import { FiSave } from "react-icons/fi";
import { MdOutlineDescription, MdOutlineImage, MdOutlineMenuBook } from "react-icons/md";

const CURRENT_YEAR = new Date().getFullYear();

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [storyPages, setStoryPages] = useState(["", "", ""]);
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;

    axios
      .get(`${API_URL}/books/${id}`)
      .then((res) => {
        if (!alive) return;
        setTitle(res.data.title ?? "");
        setAuthor(res.data.author ?? "");
        setPublishYear(String(res.data.publishYear ?? ""));
        setDescription(res.data.description ?? "");
        setCoverImage(res.data.coverImage ?? "");
        const pages = String(res.data.story ?? "")
          .split(/\n\s*---PAGE---\s*\n/)
          .map((page) => page.trim());
        setStoryPages([pages[0] ?? "", pages[1] ?? "", pages[2] ?? ""]);
      })
      .catch((error) => {
        console.log(error);
        if (alive) enqueueSnackbar("Could not load this book.", { variant: "error" });
      })
      .finally(() => {
        if (alive) setFetching(false);
      });

    return () => {
      alive = false;
    };
  }, [id, enqueueSnackbar]);

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

  const handleEditBook = async () => {
    if (!validate()) {
      enqueueSnackbar("Please fix the highlighted fields.", { variant: "warning" });
      return;
    }

    setSaving(true);
    try {
      await axios.put(`${API_URL}/books/${id}`, {
        title: title.trim(),
        author: author.trim(),
        publishYear: Number(publishYear),
        description: description.trim(),
        coverImage,
        story: storyPages.map((page) => page.trim()).filter(Boolean).join("\n---PAGE---\n"),
      });
      enqueueSnackbar("Book updated successfully!", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      enqueueSnackbar(
        error.response?.data?.message || "Could not update the book. Please try again.",
        { variant: "error" },
      );
    } finally {
      setSaving(false);
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

  const updateStoryPage = (index, value) => {
    setStoryPages((current) => current.map((page, pageIndex) => (pageIndex === index ? value : page)));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      <BackButton />

      <div className="mt-7">
        <PageHeading
          icon={<AiOutlineEdit />}
          eyebrow="Update entry"
          title="Edit Book"
          subtitle="Change any detail below and save to update your library."
          tone="amber"
        />
      </div>

      {fetching ? (
        <div className="glass rounded-3xl">
          <Spinner label="Loading book details…" />
        </div>
      ) : (
        <div className="glass animate-fade-up relative overflow-hidden rounded-3xl p-7 sm:p-9">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-amber-400 via-orange-400 to-rose-400"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-amber-500/15 blur-3xl"
          />

          <div className="relative space-y-6">
            <TextField
              id="title"
              label="Title"
              icon={<PiBookOpenTextLight />}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              autoFocus
            />

            <TextField
              id="author"
              label="Author"
              icon={<BiUserCircle />}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              error={errors.author}
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
            />

            <div>
              <label htmlFor="coverImage" className="mb-2 block text-sm font-bold text-black">Change book cover</label>
              <div className="flex flex-wrap items-center gap-4 rounded-2xl border-2 border-[#98ae96] bg-[#f7fff5] p-4 shadow-sm">
                {coverImage ? (
                  <img src={coverImage} alt="Current book cover" className="h-32 w-24 rounded-lg object-cover shadow-md ring-1 ring-white/15" />
                ) : (
                  <span className="grid h-32 w-24 place-items-center rounded-lg bg-[#e0efdc] text-3xl text-black ring-1 ring-[#a7bda4]"><MdOutlineImage /></span>
                )}
                <div className="space-y-2">
                  <input id="coverImage" type="file" accept="image/*" onChange={handleCoverChange} className="block text-sm text-black file:mr-3 file:rounded-lg file:border file:border-[#9b7433] file:bg-[#f5dcaa] file:px-3 file:py-2 file:text-sm file:font-bold file:text-black hover:file:bg-[#eac983]" />
                  {coverImage && <button type="button" onClick={() => setCoverImage("")} className="text-xs font-bold text-[#6b1d16] hover:text-black">Remove cover image</button>}
                  <p className="text-xs font-medium text-black">JPG, PNG, or WebP · maximum 3 MB.</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-bold text-black">Book description</label>
              <div className="relative">
                <MdOutlineDescription className="pointer-events-none absolute top-4 left-4 text-lg text-slate-500" />
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={1000} placeholder="Write a short description of this book…" className="field resize-y py-3 pr-4 pl-11" />
              </div>
            </div>

            <section className="rounded-2xl border-2 border-[#98ae96] bg-[#f7fff5] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f5dcaa] text-xl text-black ring-1 ring-[#b8944d]"><MdOutlineMenuBook /></span>
                <div><h2 className="font-bold text-black">Edit story preview</h2><p className="mt-0.5 text-xs font-medium text-black">Each section is shown as one page in Quick Preview.</p></div>
              </div>
              <div className="mt-5 space-y-5">
                {storyPages.map((storyPage, index) => (
                  <div key={index}>
                    <label htmlFor={`storyPage${index + 1}`} className="mb-2 block text-sm font-bold text-black">Story preview · Page {index + 1}</label>
                    <textarea id={`storyPage${index + 1}`} value={storyPage} onChange={(e) => updateStoryPage(index, e.target.value)} rows={6} placeholder={`Write the preview for page ${index + 1}…`} className="field resize-y px-4 py-3" />
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={handleEditBook}
                disabled={saving}
                className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    Updating…
                  </>
                ) : (
                  <>
                    <FiSave className="text-base" />
                    Update Book
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={saving}
                className="btn-ghost text-sm disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
