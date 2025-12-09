import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 shadow-xl rounded-2xl p-6 m-4 border border-gray-300 hover:shadow-3xl transition duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl"></div>

      <h2 className="absolute top-3 right-3 border-1 text-gray-500 px-3 py-1 rounded-full text-xs font-bold shadow-md">
        {book.publishYear}
      </h2>

      <h4 className="text-gray-500 text-sm mb-3 tracking-wide">ID: {book.id}</h4>

      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-400 p-3 rounded-lg flex items-center justify-center shadow-md">
          <PiBookOpenTextLight className="text-blue-600 text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{book.title}</h2>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gray-400 p-3 rounded-lg flex items-center justify-center shadow-md">
          <BiUserCircle className="text-white text-3xl" />
        </div>
        <h2 className="text-md text-gray-700 font-medium">{book.author}</h2>
      </div>

      <div className="flex items-center justify-between mt-6 text-2xl px-4">
        <BiShow
          className="text-blue-600 hover:text-gray-900 cursor-pointer hover:scale-110 transition"
          onClick={() => setShowModal(true)}
        />

        <Link to={`/books/details/${book.id}`}>
          <BsInfoCircle className="text-green-500 hover:text-gray-900 hover:scale-110 transition" />
        </Link>

        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-yellow-400 hover:text-gray-900 hover:scale-110 transition" />
        </Link>

        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-red-500 hover:text-gray-900 hover:scale-110 transition" />
        </Link>
      </div>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookSingleCard;