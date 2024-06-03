import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const AdminHome = () => {
    const { user } = useAuth() || {};
    const axiosSecure = useAxiosSecure();
    const [userStats, setUserStats] = useState({ totalUsers: 0, totalCoins: 0 });

    // Fetch user stats
    const { data: fetchedUserStats, isLoading: isLoadingUserStats, isError: isErrorUserStats } = useQuery({
        queryKey: ["userStats"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/userStats`);
            return response.data;
        },
        enabled: !!user?.email, // Only fetch if user email is available
    });

    useEffect(() => {
        if (fetchedUserStats) {
            setUserStats(fetchedUserStats);
        }
    }, [fetchedUserStats]);

    if (isLoadingUserStats) {
        return <div>Loading...</div>;
    }

    if (isErrorUserStats) {
        return <div>Error fetching user stats</div>;
    }

    return (
        <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">States</h2>
            </div>
            <div className="grid gap-6 my-16 md:grid-cols-3">
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Total Users</p>
                    <p className="text-2xl font-semibold">{userStats.totalUsers}</p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Total Coins</p>
                    <p className="text-2xl font-semibold">{userStats.totalCoins}</p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Total Payments</p>
                    <p className="text-2xl font-semibold">9 dollars</p>
                </div>
            </div>
            <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">Task To Review</h2>
                <div className="overflow-x-auto whitespace-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Worker Name</th>
                                <th>Withdraw Coin</th>
                                <th>Payment Number</th>
                                <th>Payment System</th>
                                <th>Withdraw Time</th>
                                <th>Payment Success Button</th>
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

export default AdminHome;
