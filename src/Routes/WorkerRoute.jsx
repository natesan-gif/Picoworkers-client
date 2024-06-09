import { Navigate } from "react-router-dom"
import useRole from "../Hooks/useRole"
import LoadingSpinner from "../components/Spinner/LoadingSpinner"

const WorkerRoute = ({ children }) => {
    const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'worker') return children
  return <Navigate to='/dashboard/forbidden' />
}
export default WorkerRoute;