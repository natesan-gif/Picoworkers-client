import React,{ useState } from 'react';
import useAuth from '../../../../Hooks/useAuth.jsx';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRole from '../../../../Hooks/useRole.jsx';
import MenuItem from '../MenuItem/MenuItem.jsx';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { FaList, FaTasks } from 'react-icons/fa';

const WorkerMenu = () => {
    const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [role] = useRole()
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => {
    setIsModalOpen(false)
  }
//   const modalHandler = async () => {
//     console.log('I want to be a host')
//     try {
//       const currentUser = {
//         email: user?.email,
//         role: 'guest',
//         status: 'Requested',
//       }
//       const { data } = await axiosSecure.put(`/user`, currentUser)
//       console.log(data)
//       if (data.modifiedCount > 0) {
//         toast.success('Success! Please wait for admin confirmation')
//       } else {
//         toast.success('Please!, Wait for admin approval👊')
//       }
//     } catch (err) {
//       console.log(err)
//       toast.error(err.message)
//     } finally {
//       closeModal()
//     }
//   }
    return (
        <>
              <MenuItem icon={BsFillHouseAddFill} label='Home' address='/dashboard' />
      <MenuItem
        icon={FaTasks}
        label='Task List'
        address='task-list'
      />
      <MenuItem
        icon={FaList}
        label='My Submission'
        address='my-submission'
      />
        </>
    );
};

export default WorkerMenu;