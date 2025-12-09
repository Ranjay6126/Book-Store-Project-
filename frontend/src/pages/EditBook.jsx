import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const {equeueSnackbar} = useSnackbar();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(String(res.data.publishYear ?? ''));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    if (!title || !author || !publishYear) {
      alert('All fields are required');
      return;
    }
    if (isNaN(publishYear)) {
      alert('Publish Year must be a number');
      return;
    }

    const data = {
      title,
      author,
      publishYear: Number(publishYear),
    };

    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully!',{variant:'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please check console');
        equeueSnackbar('Error',{variant :'error'});
        console.log(error.response?.data || error.message);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-8 underline decoration-4 underline-offset-4'>📖Edit Book📚</h1>
      {loading && <Spinner />}

      <div className='flex flex-col border-2 border-sky-500 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-600'>Title:-</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-600 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-600'>Author:-</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-600 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-600'>Publish Year:-</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-600 px-4 py-2 w-full'
          />
        </div>

        <button
          className='p-2 bg-sky-700 text-white m-8 rounded'
          onClick={handleEditBook}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
