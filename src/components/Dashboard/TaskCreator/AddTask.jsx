import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AddTaskForm from '../../AddTaskForm/AddTaskForm'

import { imageUpload } from '../../../api/utils'
import useAxiosSecure from '../../../Hooks/useAxiosSecure.jsx'
import useAuth from '../../../Hooks/useAuth.jsx'
import useAxiosPublic from '../../../Hooks/useAxiosPublic.jsx'
const AddTask = () => {
      const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const axiosPublic=useAxiosPublic()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')

  const { mutateAsync } = useMutation({
    mutationFn: async taskData => {
      const { data } = await axiosPublic.post(`/tasks`, taskData)
      return data
    },
    onSuccess: () => {
      console.log('Data Saved Successfully')
      toast.success('Task Added Successfully!')
      navigate('/dashboard/my-tasks')
      setLoading(false)
    },
  })

  //   Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
      const title = form.title.value;
      const detail = form.task_detail.value; 
      const quantity = parseInt(form.task_quantity.value, 10); 
      const info = form.submission_info.value; 
    const amount = parseFloat(form.payable_amount.value);
      const date = form.completion_date.value;
    const image = form.image.files[0]
    const taskCreator = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }
   // Calculate price
    const price = amount * quantity;
    try {
      const image_url = await imageUpload(image)
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
      }
      // console.table(taskData)

      //   Post request to server
      await mutateAsync(taskData)
      toast.success('task added successfully')
    } catch (err) {
      // console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  }

  //   handle image change
  const handleImage = image => {
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }
    return (
       <>
      <Helmet>
        <title>Add Task | Dashboard</title>
      </Helmet>

      {/* Form */}
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