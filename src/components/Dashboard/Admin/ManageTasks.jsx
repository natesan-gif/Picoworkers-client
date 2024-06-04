import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdClose, MdDelete } from "react-icons/md";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');



const ManageTasks = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [items, setItems] = useState([]);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    data: fetchedItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/tasks`);
      return response.data;
    },
  });
  // console.log(fetchedItems)
  const deleteMutation = useMutation({
    mutationFn: (_id) => axiosPublic.delete(`/tasks/${_id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Task has been deleted", "success");
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Helmet>
        <title> Manage Tasks | Dashboard</title>
      </Helmet>
      <div className="mx-auto text-center space-y-4">
        <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">
          Tasks
        </h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Task Title</th>
                <th>TaskCreator Name</th>
                <th>Task Count</th>
                <th>Coin Needed</th>
                <th>Availability</th>
                <th>View Task</th>
                <th>Delete Task</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task?.title}</td>
                  <td>{task?.taskCreator?.name}</td>
                  <td>{task?.quantity}</td>
                  <td>{task?.amount*task?.quantity}</td>
                  <td>{task?.quantity > 0 ? 'Available' : 'Not Available'}</td>
                  <td>
                   
                      <button
                        onClick={openModal}
                        className="text-[#0044BC] bg-transparent text-2xl"
                      >
                        <FaEye />
                      </button>
                      <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        
                        <button className="absolute top-0 right-0 bg-blue-100 p-2 text-sm font-medium rounded-full text-blue-900 Z-10hover:text-blue-700 hover:bg-blue-500 focus:outline-none" onClick={closeModal}><MdClose></MdClose> </button>
                        <div className="p-4">Task Detail: {task.detail}</div>
                      </Modal>
                    
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(task._id)}
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
    </div>
  );
};

export default ManageTasks;
