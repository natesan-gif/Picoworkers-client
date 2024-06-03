import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const MySubmission = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
      const { data: taskItem, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/mySubmission/${user.email}`);
      //  console.log(foodsItem)
      return response.data;
    },
  });
  const [item, setItem] = useState(taskItem);
console.log(item)
  useEffect(() => {
    setItem(taskItem);
  }, [taskItem]);
    return (
         <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title>My Submission | Dashboard</title>
        </Helmet>
          <div className='py-8'>
             <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">My Submission</h2>
            </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Task Id
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                  Task title
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                  Photo Url
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                   Amount
                    </th>

                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                    Worker email
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                  Submission Details
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                 Worker Name
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                 Creator Name
                    </th>
                  </tr>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
             Creator Email
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
             Submission Date
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
           Status
                    </th>
                </thead>
                <tbody>
                 {item && item.map((submission) => (
                  <tr key={submission._id}>
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.task_id}</td>
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.task_title}</td>
                   
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.task_detail}</td>
                   
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.task_image}</td>
                   
                         <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.payable_amount}</td>
                                 <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.worker_email}</td>
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.submission_detail}</td>
            
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.worker_name}</td>
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.taskCreator_name}</td>
                    <td className='px-2 py-3 border-b border-gray-200 bg-white text-sm'>{submission.current_date}</td>
                    <td className=' m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm items-center mt-2'>{submission.status}</td>
                   
                  </tr>
                ))}
                
               
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MySubmission;