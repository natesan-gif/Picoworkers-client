import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../../Hooks/useAuth';

const UpdateTask = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { loading } = useAuth();
  const { id } = useParams();

  const { data: initialData, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/tasks/${id}`);
      return response.data;
    },
  });

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (initialData) {
      setItem(initialData);
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: async (updatedTaskItem) => {
      const response = await axiosSecure.put(`/tasks/${item._id}`, updatedTaskItem);
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.modifiedCount) {
        setItem(data);
        await Swal.fire({
          title: "Success!",
          text: "Task updated successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/dashboard/my-tasks");
      }
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });

  // Form handler
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const detail = form.task_detail.value;
   const info = form.submission_info.value; 
    const updatedTaskItem = {
      title,
      detail,
       info
    };
    mutation.mutate(updatedTaskItem);
  };



  return (
    <div className='w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleUpdateTask}>
        <div className='w-[500px]'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
                Task Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                name='title'
                id='title'
                type='text'
                placeholder='Task Title'
                defaultValue={item?.title || ''}
                required
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='detail' className='block text-gray-600'>
                Task Detail
              </label>
              <textarea
                id='detail'
                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500'
                name='task_detail'
                placeholder='Task Detail'
                defaultValue={item?.detail || ''}
              ></textarea>
            </div>
             <div className='space-y-1 text-sm'>
              <label htmlFor='info' className='block text-gray-600'>
               Submission Info
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='submission_info'
                id='info'
                type='text'
                              placeholder='Submission Info'
                                 defaultValue={item?.info || ''}
                required
              />
            </div>
        
          </div>
        </div>

        <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium bg-[#0044BC] text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? (
            <TbFidgetSpinner className='animate-spin m-auto' />
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
