import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ViewDetails = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState("");
  const { id } = useParams();
  // const foodsItem = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { data: taskItem, isLoading } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/tasks/${id}`);
      //  console.log(foodsItem)
      return response.data;
    },
  });
  const [item, setItem] = useState(taskItem);

  useEffect(() => {
    setItem(taskItem);
  }, [taskItem]);
  const { data: labour } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user.email}`);
      //  console.log(foodsItem)
      return response.data;
    },
  });
  const [worker, setWorker] = useState(labour);

  useEffect(() => {
    setWorker(labour);
  }, [labour]);
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // You can customize the format as needed
    setCurrentDate(formattedDate);
  }, []);
  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <Helmet>
        <title>View Details| Dashboard</title>
      </Helmet>

      <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            Current Date: {currentDate}{" "}
          </span>
          <p
            className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 "
            role="button"
          >
            Pending
          </p>
        </div>
        <div className="mt-4">
          <h4 className="text-xl">Id: {item?._id}</h4>
        </div>
        <div className="mt-2">
          <h4 className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
            Title: {item?.title}
          </h4>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Detail: {item?.detail}
          </p>
        </div>
        <h6 className="mt-4 ">Payable Amount: {item?.amount}</h6>
        <div className="flex items-center justify-between mt-4 gap-4">
          <h6>Image: {item?.image}</h6>
        </div>

        <div className="flex items-center justify-between mt-4 gap-4">
          <p className=" text-gray-700 cursor-pointer dark:text-gray-200">
            TaskCreator Email: {item?.taskCreator?.email}
          </p>

          <div className="flex items-center">
            <p className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
              TaskCreator: {item?.taskCreator?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 gap-4">
          <p className=" text-gray-700 cursor-pointer dark:text-gray-200">
            Worker Email: {worker?.email}
          </p>

          <div className="flex items-center">
            <p className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
              Worker: {worker?.name}
            </p>
          </div>
        </div>
        <form className="mt-4">
          <label className="label">
            <span className="label-text">Submission Detail</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="submission_detail"
              placeholder="Submission Detail"
              className="input input-bordered w-full"
            />
                  </label>
                   <input
                type="submit"
                value="Submit"
                className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-4"
              />
        </form>
      </div>
    </div>
  );
};

export default ViewDetails;
