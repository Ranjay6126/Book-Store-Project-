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
    <header className="animate-fade-in relative z-30 shrink-0">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-2 pt-2.5 sm:gap-9 sm:px-4 sm:pt-7">
        {/* Left decorative plate */}
        <figure className="animate-float block shrink-0">
          <img
            src={imagebook}
            alt=""
            aria-hidden="true"
            className="h-10 w-16 rounded-lg border border-white/12 object-cover opacity-85 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.85)] sm:h-20 sm:w-32 sm:rounded-2xl"
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
            className="absolute -inset-1 rounded-full bg-linear-to-r from-[#50C878] via-[#fbaed2] to-[#f0dc82] opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-95"
          />

          <span className="relative flex items-center gap-2 rounded-full border border-white/70 bg-linear-to-r from-[#50C878] via-[#fbaed2] to-[#f0dc82] px-3.5 py-2 shadow-[0_18px_44px_-14px_rgba(16,122,68,0.75),inset_0_1px_0_0_rgba(255,255,255,0.45)] transition-transform duration-300 group-hover:-translate-y-0.5 group-active:translate-y-0 group-active:scale-[0.98] sm:gap-3 sm:px-9 sm:py-3.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-white/85 ring-1 ring-white/70 backdrop-blur-sm sm:h-10 sm:w-10 sm:rounded-xl">
              <PiBooksDuotone className="text-base text-emerald-950 sm:text-2xl" />
            </span>

            <span className="text-left leading-tight">
              <span className="block whitespace-nowrap text-sm font-bold tracking-tight text-emerald-950 sm:text-xl">
                Books Store System
              </span>
            </span>
          </span>
        </Link>

        {/* Right decorative plate */}
        <figure
          className="animate-float block shrink-0"
          style={{ animationDelay: "1.4s" }}
        >
          <img
            src={bookImg}
            alt=""
            aria-hidden="true"
            className="h-10 w-16 rounded-lg border border-white/12 object-cover opacity-85 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.85)] sm:h-20 sm:w-32 sm:rounded-2xl"
          />
        </figure>
      </div>

      {/* Quick add shortcut, only off the home page */}
      {!onHome && (
        <div className="mx-auto mt-3 flex max-w-7xl justify-center px-3 sm:mt-6 sm:px-4">
          <Link to="/books/create" className="btn-ghost text-sm">
            <MdOutlineAddBox className="text-lg" />
            Add a new book
          </Link>
        </div>
      )}

      {/* hairline divider */}
      <div
        aria-hidden="true"
        className="mx-auto mt-2.5 h-px max-w-6xl bg-linear-to-r from-transparent via-white/15 to-transparent sm:mt-5"
      />
    </header>
  );
};

export default Navbar;
