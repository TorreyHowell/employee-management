import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateAdminRoute = () => {
  const { isOwner, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <></>
  }

  return isOwner ? <Outlet /> : <Navigate to="/dashboard" />
}

export default PrivateAdminRoute
