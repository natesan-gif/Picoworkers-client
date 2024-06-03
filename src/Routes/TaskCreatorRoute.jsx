import React from 'react';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router-dom';

const TaskCreatorRoute = ({ children }) => {
   const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'taskCreator') return children
  return <Navigate to='/dashboard' />
};

export default TaskCreatorRoute;