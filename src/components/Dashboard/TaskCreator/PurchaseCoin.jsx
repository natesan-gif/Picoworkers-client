import { Link } from "react-router-dom";
import Payment from "../../Payment/Payment";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
const PurchaseCoin = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["buy"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/buy`);
    //   console.log(data);
      return response.data;
    },
  });
  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl ">
      <div>
            <Helmet>
        <title>Purchase coin | Dashboard</title>
      </Helmet>
 </div>
      <div className=" mx-auto text-center space-y-4">
        <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black ">
          Purchase Coin
        </h2>
      </div>
      <div className="grid gap-6 my-16 md:grid-cols-2 lg:grid-cols-4 mx-8">
        {data?.map((item) => (
          
            <Link item={item} key={item._id}
              to={`/dashboard/payment/${item._id}`}
              className="flex flex-col p-8 space-y-4 rounded-md bg-[#416EF0] text-white"
			>
				<p className="text-2xl font-semibold">{item.coins}  coins</p>
				<p className="text-2xl font-semibold ">{item.balance} $</p>
				
            </Link>
        
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
