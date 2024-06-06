import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const {
    data: fetchedItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments/${user?.email}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);
//   console.log(items);
  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <Helmet>
        <title>Payment History | Dashboard</title>
      </Helmet>
      <div className="mx-auto">
        <h2 className="text-center text-2xl mb-4 lg:mb-8 lg:text-4xl font-bold text-black">
          Payment History
        </h2>
      </div>
      <div className="overflow-x-auto whitespace-nowrap">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Transaction Id</th>
              <th>Date</th>
              <th>Name</th>
              <th>email</th>
              <th>Transaction Amount</th>
            </tr>
          </thead>
          <tbody className="w-100%">
            {items?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.transactionId}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>

                <td>{item.email}</td>
                <td>{item.price} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
