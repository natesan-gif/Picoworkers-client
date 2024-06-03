import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TaskListCard from '../components/TaskListCard';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Spinner/LoadingSpinner';

const TaskList = () => {
    const [items, setItems] = useState([]);
    const axiosSecure=useAxiosSecure()
      const {
    data: fetchedItems,
    isLoading,

  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/tasks`);
      return response.data;
    },
  });
      useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
      }, [fetchedItems]);
    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    
    return (
         <div className="w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
             <Helmet>
          <title>Task List| Dashboard</title>
        </Helmet>
           
            <div className="mx-auto text-center space-y-4">
                <h2 className="pt-6 text-2xl lg:text-4xl font-bold text-black">Task List</h2>
            </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-4 lg:mt-10 px-2 lg:px-6">
   {items?.slice(0, 6).map(item => (
                   <TaskListCard item={item} key={item._id}> </TaskListCard>
                ))} 
                
              
               
              </div>
          
            </div>
    );
};

export default TaskList;