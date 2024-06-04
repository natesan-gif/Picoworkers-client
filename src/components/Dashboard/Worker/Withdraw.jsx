import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const Withdraw = () => {
      const [item, setItems] = useState(null);
  const axiosSecure = useAxiosSecure();
    const [coinToWithdraw, setCoinToWithdraw] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [maxWithdrawal, setMaxWithdrawal] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
const { user } = useAuth();

  // Fetch user data
  const { data: fetchedItems, isLoading: isLoadingUser, isError: isErrorUser } = useQuery({
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
    const handleCoinChange = (e) => {
        const coins = parseInt(e.target.value);
        setCoinToWithdraw(coins);
        setWithdrawAmount(Math.floor(coins / 20));
        setAlertMessage('');
    };

    const handleWithdraw = () => {
        if (withdrawAmount <= maxWithdrawal) {
            // Insert withdrawal information into withdrawCollection
            // Reset form fields
            setCoinToWithdraw(0);
            setWithdrawAmount(0);
            setPaymentSystem('');
            setAccountNumber('');
            setAlertMessage('');
        } else {
            setAlertMessage("Withdrawal amount exceeds maximum limit.");
        }
    };

    // Function to calculate maximum withdrawal amount
    const calculateMaxWithdrawal = (coins) => {
        return Math.floor(coins / 20);
    };
if(isLoadingUser) return <LoadingSpinner></LoadingSpinner>
    return (
             <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
             <Helmet>
          <title>Withdraw| Dashboard</title>
        </Helmet>
           
            <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">Withdraw</h2>
            </div>
            <div className='mt-4'>
                <form>
                    <div>
                <label htmlFor="coinToWithdraw">Coin To Withdraw (Number): </label>
                <input type="number" id="coinToWithdraw" value={coinToWithdraw} onChange={handleCoinChange} />
            </div>
            <div>
                <label htmlFor="withdrawAmount">Withdraw Amount (Dollar): </label>
                <input type="number" id="withdrawAmount" value={withdrawAmount} disabled />
            </div>
            <div>
                <label htmlFor="paymentSystem">Select Payment System: </label>
                <select id="paymentSystem" value={paymentSystem} onChange={(e) => setPaymentSystem(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Bkash">Bkash</option>
                    <option value="Rocket">Rocket</option>
                    <option value="Nagad">Nagad</option>
                </select>
            </div>
            <div>
                <label htmlFor="accountNumber">Account Number: </label>
                <input type="text" id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            </div>
            <div>
                <button type='submit' onClick={handleWithdraw}>Withdraw</button>
            </div>
            {alertMessage && <div>{alertMessage}</div>}
       
                </form>
            </div>
        </div>
    );
};

export default Withdraw;
