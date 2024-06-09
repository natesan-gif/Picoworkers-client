import { Navigate } from 'react-router-dom'
import useRole from '../Hooks/useRole'
import LoadingSpinner from '../components/Spinner/LoadingSpinner'


const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard/forbidden' />
}

export default AdminRoute