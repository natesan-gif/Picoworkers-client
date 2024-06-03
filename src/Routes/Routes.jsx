import {
  createBrowserRouter,
} from "react-router-dom"
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import AddTask from "../components/Dashboard/TaskCreator/AddTask";
import MyTasks from "../components/Dashboard/TaskCreator/MyTasks";
import PurchaseCoin from "../components/Dashboard/TaskCreator/PurchaseCoin";
import UpdateTask from "../components/Dashboard/TaskCreator/UpdateTask";
import PaymentHistory from "../components/Dashboard/TaskCreator/PaymentHistory";
import TaskCreatorHome from "../components/Dashboard/TaskCreator/TaskCreatorHome";
import PrivateRoute from "./PrivateRoute";
import TaskCreatorRoute from "./TaskCreatorRoute";


export const router = createBrowserRouter([
  {
    path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [  
            {
                path: '/',
                element:<Home></Home>
          },
          {
            path: '/register',
            element:<Register></Register>
          },
          {
            path: '/login',
            element:<Login></Login>
          }
       
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [  
      {
        path: 'task-creator-home',
        element: <PrivateRoute>
          <TaskCreatorRoute>
            <TaskCreatorHome></TaskCreatorHome>
          </TaskCreatorRoute>
        </PrivateRoute>
    },
      {
        path: 'add-task',
          element: <PrivateRoute>
          <TaskCreatorRoute>
         <AddTask></AddTask>
          </TaskCreatorRoute>
        </PrivateRoute>
    },
      {
        path: 'my-tasks',
          element: <PrivateRoute>
          <TaskCreatorRoute>
           <MyTasks></MyTasks>
          </TaskCreatorRoute>
        </PrivateRoute>
    },
    
      {
        path: 'update-task/:id',
    element: <PrivateRoute>
          <TaskCreatorRoute>
            <UpdateTask></UpdateTask>
          </TaskCreatorRoute>
        </PrivateRoute>
    },
   
      {
        path: 'purchase-coin',
           element: <PrivateRoute>
          <TaskCreatorRoute>
           <PurchaseCoin></PurchaseCoin>
          </TaskCreatorRoute>
        </PrivateRoute>

      },
      {
        path: 'payment-history',
    element: <PrivateRoute>
          <TaskCreatorRoute>
            <PaymentHistory></PaymentHistory>
          </TaskCreatorRoute>
        </PrivateRoute>
    },
    ]
  }
]);


