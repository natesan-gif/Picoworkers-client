import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../Spinner/LoadingSpinner";

const MySubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // You can change this number based on your needs

  const { data: taskData, isLoading } = useQuery({
    queryKey: ["tasks", currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(`/mySubmission/${user.email}?page=${currentPage}&limit=${itemsPerPage}`);
      return response.data;
    },
  });

  const [item, setItem] = useState([]);

  useEffect(() => {
    if (taskData) {
      setItem(taskData.submissions);
    }
  }, [taskData]);

  const getStatusButtonClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
if (isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>My Submission | Dashboard</title>
      </Helmet>
      <div className="py-8">
        <div className="mx-auto text-center space-y-4">
          <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">
            My Submission
          </h2>
        </div>
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Task Id</th>
                <th>Task title</th>
                <th>Photo Url</th>
                <th>Amount</th>
                <th>Worker email</th>
                <th>Submission Details</th>
                <th>Worker Name</th>
                <th>Creator Name</th>
                <th>Creator Email</th>
                <th>Submission Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {item &&
                item.map((submission) => (
                  <tr key={submission._id}>
                    <td>{submission.task_id}</td>
                    <td>{submission.task_title}</td>
                    <td>{submission.task_detail}</td>
                    <td>{submission.task_image}</td>
                    <td>{submission.payable_amount}</td>
                    <td>{submission.worker_email}</td>
                    <td>{submission.submission_detail}</td>
                    <td>{submission.worker_name}</td>
                    <td>{submission.taskCreator_name}</td>
                    <td>{submission.current_date}</td>
                    <td>
                      <button
                        className={`m-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm items-center mt-2 ${getStatusButtonClass(submission.status)}`}
                      >
                        {submission.status}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {taskData?.totalPages && [...Array(taskData.totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded ${currentPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySubmission;
