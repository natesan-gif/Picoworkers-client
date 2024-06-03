import PropTypes from 'prop-types'
import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'
import useAuth from '../../../Hooks/useAuth'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import UpdateUserModal from './UpdateUserModal'

const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()
  const { mutateAsync } = useMutation({
    mutationFn: async role => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        role
      )
      return data
    },
    onSuccess: data => {
      refetch()
      console.log(data)
      toast.success('User role updated successfully!')
      setIsOpen(false)
    },
  })

  //   modal handler
  const modalHandler = async selected => {
    if (loggedInUser.email === user.email) {
      toast.error('Action Not Allowed')
      return setIsOpen(false)
    }
    const userRole = {
      role: selected,
     
    }

    try {
      await mutateAsync(userRole)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.image}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       <p className='text-gray-900 whitespace-no-wrap'>{user?.coins}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-blue-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
          </td>
          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       <p className='text-gray-900 whitespace-no-wrap'>Remove</p>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow