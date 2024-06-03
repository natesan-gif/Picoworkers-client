import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth.jsx'
import useAxiosSecure from './useAxiosSecure.jsx'
const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`)
      return data.role
    },
  })

  //   Fetch user info using logged in user email

  return [role, isLoading]
}

export default useRole