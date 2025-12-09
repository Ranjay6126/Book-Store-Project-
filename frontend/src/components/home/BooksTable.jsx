import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white backdrop-blur-sm">
      <table className="w-full border-collapse text-left">
        
        {/* Header */}
        <thead>
          <tr className="bg-gradient-to-r from-sky-600 to-blue-700 text-white">
            <th className="px-5 py-4 border-b border-blue-800 text-center tracking-wide">
              NO
            </th>
            <th className="px-5 py-4 border-b border-blue-800 text-center tracking-wide">
              TITLE
            </th>
            <th className="px-5 py-4 border-b border-blue-800 text-center tracking-wide max-md:hidden">
              AUTHOR
            </th>
            <th className="px-5 py-4 border-b border-blue-800 text-center tracking-wide max-md:hidden">
              YEAR
            </th>
           <th className="px-5 py-4 border-b border-blue-800 tracking-wide text-center">
  OPERATIONS
</th>

          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-100/40 transition-all duration-300"
            >
              <td className="px-5 py-4 border-b border-gray-200 text-center font-semibold text-gray-700">
                {index + 1}
              </td>

              <td className="px-5 py-4 border-b border-gray-200 text-center font-medium text-gray-800">
                {book.title}
              </td>

              <td className="px-5 py-4 border-b border-gray-200 text-center max-md:hidden text-gray-700">
                {book.author}
              </td>

              <td className="px-5 py-4 border-b border-gray-200 text-center max-md:hidden text-gray-700">
                {book.publishYear}
              </td>

              <td className="px-5 py-4 border-b border-gray-200">
                <div className="flex justify-center gap-x-6 text-2xl">

                  {/* Details */}
                  <Link
                    to={`/books/details/${book._id}`}
                    className="transition-all hover:scale-125 hover:text-green-700"
                  >
                    <div className="p-2 bg-green-100 rounded-full shadow-sm hover:shadow-md">
                      <BsInfoCircle className="text-green-600" />
                    </div>
                  </Link>

                  {/* Edit */}
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="transition-all hover:scale-125 hover:text-yellow-600"
                  >
                    <div className="p-2 bg-yellow-100 rounded-full shadow-sm hover:shadow-md">
                      <AiOutlineEdit className="text-yellow-500" />
                    </div>
                  </Link>

                  {/* Delete */}
                  <Link
                    to={`/books/delete/${book._id}`}
                    className="transition-all hover:scale-125 hover:text-red-700"
                  >
                    <div className="p-2 bg-red-100 rounded-full shadow-sm hover:shadow-md">
                      <MdOutlineDelete className="text-red-600" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
