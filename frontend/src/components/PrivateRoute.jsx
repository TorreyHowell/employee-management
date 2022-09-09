import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus, isVerified } = useAuthStatus()

  if (checkingStatus) {
    return <></>
  }

  if (loggedIn && isVerified) {
    return <Outlet />
  } else if (loggedIn && !isVerified) {
    return <Navigate to="/not-verified" />
  } else {
    return <Navigate to="/" />
  }
}

export default PrivateRoute
