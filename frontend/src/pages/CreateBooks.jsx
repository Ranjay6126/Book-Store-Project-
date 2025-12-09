import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

 const handleSaveBook = () => {
  //  Optional: Input validation
  if (!title || !author || !publishYear) {
    alert("All fields are required");
    return;
  }

  if (isNaN(publishYear)) {
    alert("Publish Year must be a number");
    return;
  }

  //  Convert publishYear to number before sending to backend
  const data = {
    title,
    author,
    publishYear: Number(publishYear),
  };

  setLoading(true);

  axios
    .post('http://localhost:3000/books', data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Book Created successfully !",{variant:'success'})
      navigate('/'); // redirect to home after successful save
    })
    .catch((error) => {
      setLoading(false);
      // alert('An error happened. Please check console');
      enqueueSnackbar('Error', {variant:'error'});
      console.log(error.response?.data || error.message); // shows backend validation error
    });
};


  return (
    <div className='p-4'>
      <BackButton /> 
      <h1 className='text-3xl my-4 underline-offset-4 underline'>📚Create Book📖</h1>

      {/* {loading ? <Spinner/> : ''} */}

      {loading && <Spinner />}

      <div className='flex flex-col border-2 border-sky-500 rounded-xl w-[600px] p-4 mx-auto'>

        {/* Title */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-600'>Title:-</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-600 px-4 py-2 w-full'
          />
        </div>

        {/* Author */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-600'>Author:-</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-600 px-4 py-2 w-full'
          />
        </div>

        {/* Publish Year */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-600'>Publish Year:-</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-600 px-4 py-2 w-full'
          />
        </div>

        {/* Save Button */}
        <button
          className='p-2 bg-sky-700 text-white m-8 rounded'
          onClick={handleSaveBook}
        >
          Save
        </button>

      </div>
    </div>
  );
};

export default CreateBooks;
