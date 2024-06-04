import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const WorkerHome = () => {
      const [item, setItems] = useState(null);
    const axiosSecure = useAxiosSecure()
    const {user}=useAuth()
  
  // Fetch user data
  const { data: fetchedItems, isLoading: isLoadingUser, isError: isErrorUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Only fetch if user email is available
  });

  // Fetch submission count
  const { data: submissionCountData, isLoading: isLoadingSubmissionCount, isError: isErrorSubmissionCount } = useQuery({
    queryKey: ["submissionCount", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/submissionCount/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Only fetch if user email is available
  });

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);
    return (
         <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
             <Helmet>
          <title>Worker Home| Dashboard</title>
        </Helmet>
           
            <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">States</h2>
            </div>
            <div className="grid gap-6 my-16 md:grid-cols-3">
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Available Coins</p>
                    <p className="text-2xl font-semibold">{item?.coins}</p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Total Submission</p>
                    <p className="text-2xl font-semibold">{submissionCountData?.count}</p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Total Earning</p>
                    <p className="text-2xl font-semibold">9 dollars</p>
                </div>
            </div>
            <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">Approved Submission</h2>
                <div className="overflow-x-auto whitespace-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task Title</th>
                                <th>Payable Amount</th>
                                <th>Creator Name</th>
                                <th>Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {/* {tasks.map((task, index) => (
                                <tr key={task._id}> */}
                                    {/* <td>{index + 1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.quantity}</td>
                                    <td>{task.amount} $</td> */}
                                    {/* <td>
                                        <Link to={`/dashboard/update-task/${task._id}`}>
                                            <button className="text-[#0044BC] bg-transparent text-2xl">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="text-[#0044BC] bg-transparent text-2xl"
                                        >
                                            <MdDelete />
                                        </button>
                                    </td> */}
                                {/* </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div> 
            </div>
        </div>
    );
};

export default WorkerHome;