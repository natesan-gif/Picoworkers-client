import React from 'react';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import UserDataRow from '../components/UserDataRow';
const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
  //   Fetch users Data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`)
      return data
    },
  })


    if (isLoading) return <LoadingSpinner />
      const workerUsers = users.filter(user => user.role === 'worker');
    return (
          <>
      <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title>Manage Users | Dashboard</title>
        </Helmet>
          <div className='py-8'>
             <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">Users</h2>
            </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                  Photo Url
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Coins
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                    Update Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                  Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workerUsers.map(user => (
                    <UserDataRow
                      key={user?._id}
                      user={user}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default ManageUsers;