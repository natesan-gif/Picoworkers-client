import { Link } from "react-router-dom";

const TaskListCard = ({item}) => {
    return (
     <div className="w-full max-w-sm px-6 py-5 bg-white rounded-md shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs text-blue-500 bg-blue-100 rounded-full ">Amount: {item?.amount}</span>
                <span className="px-3 py-1 text-xs text-blue-500 bg-blue-100 rounded-full ">Quantity: {item?.quantity}</span>
    </div>
    <div>
                <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{ item?.title}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Creator Name: {item?.taskCreator?.name}</p>
    </div>
    <div className="pt-4">    
           <Link to={`/dashboard/view-details/${item._id}`}>
                <div className="flex justify-center">
                  <button className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                   
                   View details
                  </button>
                </div>
              </Link>
    </div>
        </div>
    )
};

export default TaskListCard;