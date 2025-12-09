
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
       
      ))}
    </div>
  );
};

export default BooksCard;
