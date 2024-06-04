import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import TaskListCard from "../components/TaskListCard";

const TaskList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const limit = 6;

  const { data: fetchedItems, isLoading, refetch } = useQuery({
    queryKey: ["tasks", currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(`/tasks?page=${currentPage}&limit=${limit}`);
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);


  const tasks = fetchedItems?.tasks || [];
  const totalPages = fetchedItems?.totalPages || 1;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <Helmet>
        <title>Task List | Dashboard</title>
      </Helmet>

      <div className="mx-auto text-center space-y-4">
        <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">
          Task List
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-4 lg:mt-10 px-2 lg:px-6">
        {tasks.map((item) => (
          <TaskListCard item={item} key={item._id} />
        ))}
      </div>

      <div className="mt-8">
        <div className="flex justify-center space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
