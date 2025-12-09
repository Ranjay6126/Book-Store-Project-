import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully");
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please check console');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error.response?.data || error.message);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-8 underline decoration-4 underline-offset-4'>📚Delete Book📖</h1>
      {loading && <Spinner />}

      {book && (
        <div className='flex flex-col border-2 border-double border-red-400 rounded-xl w-fit p-4'>
          <div className='my-2'>
            <span className='text-xl mr-4 text-gray-500'>Title:</span>
            <span>{book.title}</span>
          </div>
          <div className='my-2'>
            <span className='text-xl mr-4 text-gray-500'>Author:</span>
            <span>{book.author}</span>
          </div>
          <div className='my-2'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year:</span>
            <span>{book.publishYear}</span>
          </div>
          <button
            className='p-2 bg-red-600 text-white m-4 rounded'
            onClick={handleDelete}
          >
             Delete 
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
