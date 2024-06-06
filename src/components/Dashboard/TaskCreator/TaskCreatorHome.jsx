import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdClose, MdDelete } from "react-icons/md";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import Modal from "react-modal";
import toast from "react-hot-toast";

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
Modal.setAppElement("#root");
const TaskCreatorHome = () => {
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
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [item, setItems] = useState(null);
  const [work, setWork] = useState([]);

  // Fetch user data
  const { data: fetchedItems, isLoading: isLoadingUser } = useQuery({
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
  const { data: fetchedTasks, isLoading: isLoadingTasks } = useQuery({
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

  // Fetch tasks assigned to the user for review
  const { data: taskItem, isLoading: isLoadingWork } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/myWork/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, // Only fetch if user email is available
  });

  useEffect(() => {
    if (taskItem) {
      setWork(taskItem);
    }
  }, [taskItem]);
  // console.log(work);
  const handleApprove = async (submissionId) => {
    try {
      await axiosSecure.patch(`/submission/${submissionId}`, {
        status: "approved",
      });
      toast.success('task approved')
 
    } catch (error) {
      console.error("Error approving submission:", error);
    }
  };

  const handleReject = async (submissionId) => {
    try {
      await axiosSecure.patch(`/submission/${submissionId}`, {
        status: "rejected",
      });
        toast.success('task rejected')
      
    } catch (error) {
      console.error("Error rejecting submission:", error);
    }
  };
    // Fetch approved submissions
  const { data: approvedSubmissions, isLoading: isLoadingApprovalSubmissions} = useQuery({
    queryKey: ["approvalSubmissions", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/approvalSubmissions/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);

  const totalPayment = approvedSubmissions?.reduce((sum, submission) => sum + submission.payable_amount, 0) || 0;
  if (isLoadingUser || isLoadingTasks || isLoadingWork|| isLoadingApprovalSubmissions)
    return <LoadingSpinner />;

  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <div className="mx-auto text-center space-y-4">
        <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">
          States
        </h2>
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
          <p className="text-2xl font-semibold">{ totalPayment}</p>
        </div>
      </div>
      <div className="mx-auto text-center space-y-4">
        <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">
          Task To Review
        </h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Worker Email</th>
                <th>Task Title</th>
                <th>Payable amount</th>
                <th>Submission Button</th>
            
              </tr>
            </thead>
            <tbody>
              {work.map((task, index) => (
                <tr key={index}>
                  <td>{task.worker_name}</td>
                  <td>{task.worker_email}</td>
                  <td>{task.task_title}</td>
                  <td>{task.payable_amount}</td>
                  <td className=" m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm items-center mt-2">
                    {" "}
                    <button onClick={openModal}>View details</button>{" "}
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <button
                        className="absolute top-0 right-0 bg-blue-100 p-2 text-sm font-medium rounded-full text-blue-900 z-10 hover:text-blue-700 hover:bg-blue-500 focus:outline-none"
                        onClick={closeModal}
                      >
                        <MdClose></MdClose>{" "}
                      </button>
                      <div className="">
                        Submission Detail: {task?.submission_detail}
                      </div>
                    </Modal>
                  </td>

                  <td className=" m-2 inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm items-center mt-2">
                    <button onClick={() => handleApprove(task._id)}>
                      Approve
                    </button>
                  </td>
                  <td className=" m-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm items-center mt-2">
                    <button onClick={() => handleReject(task._id)}>
                      Reject
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

export default TaskCreatorHome;
