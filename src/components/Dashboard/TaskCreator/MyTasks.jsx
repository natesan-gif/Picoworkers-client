import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic, { axiosPublic } from '../../../Hooks/useAxiosPublic';

const MyTasks = () => {
    const [items, setItems] = useState([]);

  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
const { data: fetchedItems, isLoading, refetch } = useQuery(
  {
    queryKey: ["myTask", user?.email], 
    queryFn: async () => {
      const response = await axiosSecure.get(`/myTask/${user?.email}`);
      return response.data;
    },
 
  },
  );
  const deleteMutation = useMutation({
    mutationFn: (_id) => axiosPublic.delete(`/tasks/${_id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Your item has been deleted", "success");
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "##0044BC",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(_id); 
      }
    });
  };

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);
     const getStatusClass = (status) => {
    switch (status) {
      case 'Available':
        return 'text-green-500';
      case 'Requested':
        return 'text-red-500';
      default:
        return 'text-black';
    }
  };
  if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div  className='w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <Helmet>
        <title>My Task | Dashboard</title>
      </Helmet>
      <div className=" mx-auto">
       
         <h2 className="text-center text-2xl mb-4 lg:mb-8 lg:text-4xl font-bold text-black">
     My Tasks
      </h2>
           
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <table className="table ">
          {/* head */}
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
             {
              items?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                      <td>
                          {item.title}
                 </td>
                      <td>
                          {item.quantity}
                 </td>
                      <td>
                          {item.amount} $
                 </td>
                  <td>
                  
                      <button className=" text-[#0044BC] bg-transparent text-2xl ">
                    <FaEdit />
                      </button>
                 
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-[#0044BC] bg-transparent text-2xl"
                    >
             <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            } 
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyTasks;