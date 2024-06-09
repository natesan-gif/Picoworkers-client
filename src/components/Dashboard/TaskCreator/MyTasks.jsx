import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyTasks = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: fetchedItems, isLoading, refetch } = useQuery({
    queryKey: ["myTask", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/myTask/${user?.email}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);

  const deleteMutation = useMutation({
    mutationFn: async ({ taskId, taskCreatorEmail, taskQuantity, payableAmount }) => {
      return axiosSecure.delete(`/tasks/${taskId}`, {
        data: { taskCreatorEmail, taskQuantity, payableAmount },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myTask", user?.email]);
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "There was an error deleting the task.", "error");
    }
  });

  const handleDelete = (taskId, taskCreatorEmail, taskQuantity, payableAmount) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({ taskId, taskCreatorEmail, taskQuantity, payableAmount });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl ">
      <Helmet>
        <title>My Task | Dashboard</title>
      </Helmet>
      <div className="mx-auto">
        <h2 className="text-center text-2xl mb-4 lg:mb-8 lg:text-4xl font-bold text-black">
          My Tasks
        </h2>
      </div>
      <div className="overflow-x-auto whitespace-nowrap">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Task Title</th>
              <th>Task Count</th>
              <th>Payable Amount</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="w-100%">
            {items?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.amount} $</td>
                <td>
                  <Link to={`/dashboard/update-task/${item._id}`}>
                    <button className="text-[#0044BC] bg-transparent text-2xl">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDelete(item._id, item.taskCreator.email, item.quantity, item.amount)
                    }
                    className="text-[#0044BC] bg-transparent text-2xl"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
