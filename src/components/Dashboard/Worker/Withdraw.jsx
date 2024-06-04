import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Withdraw = () => {
  const [item, setItems] = useState(null);
  const [withdrawCoin, setWithdrawCoin] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch user data
  const { data: fetchedItems, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);

  const withdrawMutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/withdraw", data),
    onSuccess: () => {
      toast.success(
        "Withdrawal request submitted successfully!",  
      );
      // You may want to reset form fields here if needed
    },
    onError: (error) => {
      console.error("Error submitting withdrawal request:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const worker_email = item?.email;
    const worker_name = item?.name;
    const withdraw_coin = form.coin.value;
    const withdraw_amount = form.coin.value/ 20;
    const payment_system = form.payment.value;
    const payment_number = form.account.value;
    // Check if user has enough coins
    if (item?.coins < withdraw_coin) {
      // Display toast message if user doesn't have enough coins
      toast.error("Insufficient coins! Please buy more coins");
      return; // Do not proceed with withdrawal
    }

    const withdrawalData = {
      worker_name,
      worker_email,
      withdraw_coin,
      withdraw_amount,
      payment_system,
      payment_number,
    };
    withdrawMutation.mutate(withdrawalData);
  };

  const handleCoinChange = (e) => {
    const value = e.target.value;
    setWithdrawCoin(value);
  };

  if (isLoadingUser) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <Helmet>
        <title>Withdraw| Dashboard</title>
      </Helmet>

      <div className="mx-auto text-center space-y-4">
        <h2 className="pt-6 text-xl lg:text-2xl font-bold text-black">
        Your Maximum Withdraw Amount: <span className="text-blue-800">{item?.coins/20} $</span>
        </h2>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="py-6">
            <label htmlFor="coinToWithdraw">Coin To Withdraw (Number): </label>
          <input
  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
  type="number"
  name="coin" // Ensure that the name matches
  id="coinToWithdraw"
  value={withdrawCoin}
  onChange={handleCoinChange}
/>
          </div>
          <div className="py-6">
            <label htmlFor="withdrawAmount">Withdraw Amount (Dollar): </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              type="number"
              name="amount"
              id="withdrawAmount"
              value={withdrawCoin / 20}
              disabled
            />
          </div>
          <div className="py-6">
            <label htmlFor="paymentSystem">Select Payment System: </label>
            <select id="paymentSystem" name="payment">
              <option value="">Select</option>
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
            </select>
          </div>
          <div className="py-6">
            <label htmlFor="accountNumber">Account Number: </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              type="text"
              id="accountNumber"
              name="account"
            />
          </div>
          <div className="py-6">
            <button
              className="w-full px-4 py-3 bg-blue-200 text-blue-800 border border-rose-300 focus:outline-rose-500 rounded-md"
              type="submit"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
