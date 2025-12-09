import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-8 underline decoration-4 underline-offset-4'>📚Show Books📖</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-double border-sky-400 rounded-xl w-fit p-4'>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>ID:</span>
            <span>{book._id}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title:</span>
            <span>{book.title}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author:</span>
            <span>{book.author}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year:</span>
            <span>{book.publishYear}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Created At:</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Updated At:</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default ShowBook;
