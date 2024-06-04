import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from '../../AddTaskForm/AddTaskForm';
import { imageUpload } from '../../../api/utils';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AddTask = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState('Upload Image');
const [item, setItems]=useState(null)
const { data:fetchedItems  } = useQuery(
  {
    queryKey: ["user", user?.email], 
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user?.email}`);
  
    
      return response.data;
    },
   
  },
  );
  
  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const detail = form.task_detail.value;
    const quantity = parseInt(form.task_quantity.value, 10);
    const info = form.submission_info.value;
    const amount = parseFloat(form.payable_amount.value);
    const date = form.completion_date.value;
    const image = form.image.files[0];
    const taskCreator = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const price = amount * quantity;

    try {
      if (item?.coins < price) {
        // Show toast indicating the user needs to buy more coins
        toast.error('You do not have enough coins. Please buy more coins.');
        setLoading(false);
        return;
      }

      const image_url = await imageUpload(image);
      const taskData = {
        title,
        detail,
        quantity,
        info,
        amount,
        date,
        taskCreator,
        image: image_url,
        price,
      };

      const response = await axiosPublic.post(`/tasks`, taskData);
      if (response.status === 200) {
        toast.success('Task Added Successfully!');
        navigate('/dashboard/my-tasks');
        window.location.reload();
      }
    } catch (err) {
      console.error('Error adding task:', err);
      toast.error('Error adding task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImage = image => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Add Task | Dashboard</title>
      </Helmet>
      <AddTaskForm
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      />
    </>
  );
};

export default AddTask;
