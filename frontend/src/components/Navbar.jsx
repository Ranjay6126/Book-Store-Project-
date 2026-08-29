import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <header className="animate-fade-in relative z-30 shrink-0 border-b border-[#d9ded3] bg-[#fffdf8]/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <PiBookOpenTextLight aria-hidden="true" className="hidden shrink-0 text-3xl text-[#17231a] sm:block" />
        <Link to="/" aria-label="Book Store System — go to home" className="rounded-xl px-2 py-1 text-center transition sm:px-3">
          <span className="block whitespace-nowrap font-serif text-lg font-bold tracking-tight text-[#1e2b24] sm:text-xl">Book Store System</span>
        </Link>
        <PiBookOpenTextLight aria-hidden="true" className="hidden shrink-0 text-3xl text-[#17231a] sm:block" />
      </div>
    </header>
  );
};

export default Navbar;
