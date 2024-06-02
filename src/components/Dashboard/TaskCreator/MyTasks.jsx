import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";


const MyTasks = () => {
    return (
        <div  className='w-full min-h-[calc(100vh-400px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <Helmet>
        <title>My Task | Dashboard</title>
      </Helmet>
      <div className=" mx-auto">
       
         <h2 className="text-center text-2xl mb-4 lg:mb-8 lg:text-4xl font-bold text-black">
     My Tasks
      </h2>
           
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Task Title</th>
              <th>Task Count</th>
              <th>Payable Amount</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="w-100%">
            {/* {
              items?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                 
                  <td>
                  
                      <button className=" text-[#f9a06f] bg-transparent text-2xl ">
                    <FaEdit />
                      </button>
                 
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-[#f9a06f] bg-transparent text-2xl"
                    >
             <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            } */}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyTasks;