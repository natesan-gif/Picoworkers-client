import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import toast from "react-hot-toast";

const AdminHome = () => {
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [userStats, setUserStats] = useState({ totalUsers: 0, totalCoins: 0 });
  const [items, setItems] = useState(null);
const [totalAmount, setTotalAmount] = useState(0);// State to store total payments

  const {
    data: fetchedUserStats,
    isLoading: isLoadingUserStats,
  } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/userStats`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (fetchedUserStats) {
      setUserStats(fetchedUserStats);
    }
  }, [fetchedUserStats]);

  const { data: fetchedItems, isLoading: isLoadingWithdraw } = useQuery({
    queryKey: ["withdraw"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/withdraw`);
      return response.data;
    },
  });

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);

  // Fetch total payments from backend
const {
  data: fetchedPaymentStats,
  isLoading: isLoadingPaymentStats,
} = useQuery({
  queryKey: ["paymentStats"],
  queryFn: async () => {
    const response = await axiosSecure.get(`/paymentsStats`);
    return response.data;
  },
});

useEffect(() => {
  if (fetchedPaymentStats) {
    setTotalAmount(fetchedPaymentStats.totalAmount);
  }
}, [fetchedPaymentStats]);
  const handlePaymentSuccess = async (withdrawId, workerEmail, withdrawCoin) => {
    try {
      const response = await axiosSecure.post("/withdraw/complete", {
        withdrawId,
        workerEmail,
        withdrawCoin,
      });
      if (response.data.success) {
        toast.success('withdraw request approved')
        setItems((prevItems) => prevItems.filter((item) => item._id !== withdrawId));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error completing withdrawal", error);
    }
  };

  if (isLoadingUserStats || isLoadingWithdraw || isLoadingPaymentStats) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl ">
      <Helmet>
        <title>Admin Home | Dashboard</title>
      </Helmet>

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
          <p className="text-2xl font-semibold">{totalAmount}$</p>
        </div>
      </div>
      <div className="mx-auto text-center space-y-4">
        <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">Withdraw Request</h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Worker Name</th>
                <th>Withdraw Coin</th>
                <th>Withdraw Amount</th>
                <th>Payment Number</th>
                <th>Payment System</th>
                <th>Withdraw Time</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item?.worker_name}</td>
                  <td>{item?.withdraw_coin}</td>
                  <td>{item?.withdraw_amount} $</td>
                  <td>{item?.payment_number}</td>
                  <td>{item?.payment_system}</td>
                  <td>{item?.createdAt}</td>
                  <td>
                    <button
                      className="px-4 py-3 bg-blue-200 text-blue-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                      onClick={() => handlePaymentSuccess(item._id, item.worker_email, item.withdraw_coin)}
                    >
                      Payment Success
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

export default AdminHome;
