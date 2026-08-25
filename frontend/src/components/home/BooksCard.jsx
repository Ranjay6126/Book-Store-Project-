import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid content-start gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {books.map((item, index) => (
        <BookSingleCard key={item._id} book={item} index={index} />
      ))}
    </div>
  );
};

export default BooksCard;
