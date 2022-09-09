import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateAdminRoute = () => {
  const { isAdmin, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <></>
  }

  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" />
}

export default PrivateAdminRoute
