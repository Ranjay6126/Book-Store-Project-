import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import bookImg from "../assets/books1.jpg";
import imagebook from "../assets/finalok.png"

import BookTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data.data);
      } catch (error) {
        console.log("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-4">

     <div className="flex justify-center items-center gap-x-6 my-4">
  <img
    // src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop"
    src={imagebook}
    alt="Open book"
    className="w-28 h-20 object-cover rounded-lg shadow-md hidden sm:block"
  />

  <button
    onClick={() => setShowType("table")}
    className={`px-6 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-md transition-all duration-300
      ${showType === "table"
        ? "bg-linear-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105"
        : "bg-white text-blue-600 border border-blue-500 hover:bg-blue-50"
      }`}
  >
    📋 Table View
  </button>

  <button
    onClick={() => setShowType("card")}
    className={`px-6 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-md transition-all duration-300
      ${showType === "card"
        ? "bg-linear-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105"
        : "bg-white text-blue-600 border border-blue-500 hover:bg-blue-50"
      }`}
  >
    🗂️ Card View
  </button>

  <img
    // src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
    src={bookImg}
    alt="Open book"
    className="w-28 h-20 object-cover rounded-lg shadow-md hidden sm:block"
  />

</div>
  <div className="flex justify-between items-center">
    <h1 className="text-3xl my-8 underline decoration-4 underline-offset-4">
      📖Books List📚
    </h1>

        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-700 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
