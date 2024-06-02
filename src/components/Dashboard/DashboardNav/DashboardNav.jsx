import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";


const DashboardNav = () => {
    const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [item, setItems]=useState(null)
const { data:fetchedItems, isLoading,  } = useQuery(
  {
    queryKey: ["user", user?.email], 
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user?.email}`);
      console.log(response.data)
      return response.data;
    },
   
  },
  );
  
  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);
//   console.log(user);
  return (
    <div>
      <header className="p-4 hidden md:block">
        <div className="container flex justify-end h-16 mx-auto">
          <ul className="items-stretch hidden space-x-3 md:flex gap-4" >
           
              <>
                <li className="flex flex-col gap-4">
                   <div>Role:  {item?.role || ""}</div>
                  <div>Available Coins: {item?.coins || ""}</div>
                </li>
                <li className="flex flex-col gap-2">
                  <div className="w-10 rounded-full items-center flex justify-center">
                    <img src={item?.image || ""} className="h-full w-full" />
                  </div>
                  <div >{item?.name || "user name not found"}</div>
                </li>
              </>
          
          </ul>
        </div>
      </header>
    </div>
  );
};

export default DashboardNav;
