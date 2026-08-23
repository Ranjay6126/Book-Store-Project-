import { Link, useLocation } from "react-router-dom";
import { PiBooksDuotone } from "react-icons/pi";
import { MdOutlineAddBox } from "react-icons/md";

import bookImg from "../assets/books1.jpg";
import imagebook from "../assets/finalok.png";

/**
 * Top-level brand header.
 * Holds the "Books Store System" button in the slot where the
 * Table / Card view buttons used to live.
 */
const Navbar = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="animate-fade-in relative z-20 mb-10">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 pt-7 sm:gap-9">
        {/* Left decorative plate */}
        <figure className="animate-float hidden shrink-0 sm:block">
          <img
            src={imagebook}
            alt=""
            aria-hidden="true"
            className="h-20 w-32 rounded-2xl border border-white/60 object-cover opacity-90 shadow-[0_18px_40px_-18px_rgba(4,61,32,0.45)]"
          />
        </figure>

        {/* ---- Books Store System brand button ---- */}
        <Link
          to="/"
          aria-label="Books Store System — go to home"
          className="group relative shrink-0 outline-none"
        >
          {/* glow halo */}
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full bg-linear-to-r from-[#50C878] via-[#fbaed2] to-[#f0dc82] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-95"
          />

          <span className="relative flex items-center gap-3 rounded-full border border-white/70 bg-linear-to-r from-[#50C878] via-[#fbaed2] to-[#f0dc82] px-6 py-3.5 shadow-[0_18px_44px_-14px_rgba(14,109,59,0.55),inset_0_1px_0_0_rgba(255,255,255,0.45)] transition-transform duration-300 group-hover:-translate-y-0.5 group-active:translate-y-0 group-active:scale-[0.98] sm:px-9">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/40 ring-1 ring-white/70 backdrop-blur-sm">
              <PiBooksDuotone className="text-2xl text-emerald-950" />
            </span>

            <span className="text-left leading-tight">
              <span className="block text-lg font-bold tracking-tight text-emerald-950 sm:text-xl">
                Books Store System
              </span>
            </span>
          </span>
        </Link>

        {/* Right decorative plate */}
        <figure
          className="animate-float hidden shrink-0 sm:block"
          style={{ animationDelay: "1.4s" }}
        >
          <img
            src={bookImg}
            alt=""
            aria-hidden="true"
            className="h-20 w-32 rounded-2xl border border-white/60 object-cover opacity-90 shadow-[0_18px_40px_-18px_rgba(4,61,32,0.45)]"
          />
        </figure>
      </div>

      {/* Quick add shortcut, only off the home page */}
      {!onHome && (
        <div className="mx-auto mt-6 flex max-w-7xl justify-center px-4">
          <Link to="/books/create" className="btn-ghost text-sm">
            <MdOutlineAddBox className="text-lg" />
            Add a new book
          </Link>
        </div>
      )}

      {/* hairline divider */}
      <div
        aria-hidden="true"
        className="mx-auto mt-7 h-px max-w-6xl bg-linear-to-r from-transparent via-white/70 to-transparent"
      />
    </header>
  );
};

export default Navbar;
