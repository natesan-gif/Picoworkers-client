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
        path: 'add-task',
        element:<AddTask></AddTask>
      },
      {
        path: 'my-tasks',
        element:<MyTasks></MyTasks>
      },
      {
        path: 'update-task/:id',
        element:<UpdateTask></UpdateTask>
      },
      {
        path: 'purchase-coin',
        element:<PurchaseCoin></PurchaseCoin>
      }
    ]
  }
]);


