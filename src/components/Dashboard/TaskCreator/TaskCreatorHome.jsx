import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TaskCreatorHome = () => {
    const { user } = useAuth() || {};
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [item, setItems] = useState(null);

    // Fetch user data
    const { data: fetchedItems, isLoading: isLoadingUser, isError: isErrorUser } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email, // Only fetch if user email is available
    });

    useEffect(() => {
        if (fetchedItems) {
            setItems(fetchedItems);
        }
    }, [fetchedItems]);

    // Fetch tasks created by the user
    const { data: fetchedTasks, isLoading: isLoadingTasks, isError: isErrorTasks } = useQuery({
        queryKey: ["userTasks", user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/myTask/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email, // Only fetch if user email is available
    });

    useEffect(() => {
        if (fetchedTasks) {
            setTasks(fetchedTasks);

            // Calculate total quantity
            const total = fetchedTasks.reduce((acc, task) => acc + task.quantity, 0);
            setTotalQuantity(total);
        }
    }, [fetchedTasks]);

    if (isLoadingUser || isLoadingTasks) {
        return <div>Loading...</div>;
    }

    if (isErrorUser || isErrorTasks) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">States</h2>
            </div>
            <div className="grid gap-6 my-16 md:grid-cols-3">
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Available Coins</p>
                    <p className="text-2xl font-semibold">{item?.coins || ""}</p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Pending Task</p>
                    <p className="text-2xl font-semibold">{totalQuantity}</p>
                </div>
                <div className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white">
                    <p className="text-xl font-semibold">Total Payment</p>
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
                                <th>Worker Email</th>
                                <th>Task Title</th>
                                <th>Payable amount</th>
                                <th>Submission Button</th>
                                <th>Approve</th>
                                <th>Reject</th>
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

export default TaskCreatorHome;
