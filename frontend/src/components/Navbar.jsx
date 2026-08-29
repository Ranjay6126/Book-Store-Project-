import { Link } from "react-router-dom";
import bookImg from "../assets/books1.jpg";
import imagebook from "../assets/finalok.png";

const Navbar = () => {
  return (
    <header className="animate-fade-in relative z-30 shrink-0 border-b border-[#d9ded3] bg-[#fffdf8]/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <img src={imagebook} alt="" aria-hidden="true" className="hidden h-11 w-16 shrink-0 rounded-lg border border-[#c4d0c1] object-cover sm:block" />
        <Link to="/" aria-label="Book Store System — go to home" className="rounded-xl px-2 py-1 text-center transition sm:px-3">
          <span className="block whitespace-nowrap font-serif text-lg font-bold tracking-tight text-[#1e2b24] sm:text-xl">Book Store System</span>
        </Link>
        <img src={bookImg} alt="" aria-hidden="true" className="hidden h-11 w-16 shrink-0 rounded-lg border border-[#c4d0c1] object-cover sm:block" />
      </div>
    </header>
  );
};

export default Navbar;
