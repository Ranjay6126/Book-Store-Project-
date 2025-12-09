import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 
    bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-400 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-blue-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-blue-400 underline text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
       <p className="mt-4 text-xl font-semibold underline text-green-400 tracking-tight hover:text-blue-600 transition-colors duration-300">
  About Ranjay’s Reading Habit
</p>

<p className="my-3 text-gray-700 leading-relaxed text-[15.5px] hover:scale-[1.01] transition-transform duration-300">
  Ranjay enjoys reading books that help him grow in technology, mindset, and
  creativity. It’s something he does consistently because it keeps him curious
  and sharp. Reading gives him new ideas to explore, helps him stay updated
  with fast-moving tech, and pushes him to think from different angles. For him,
  books are a simple way to learn something useful every day.
</p>

      </div>
    </div>
  );
};

export default BookModal;
