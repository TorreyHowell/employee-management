import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const { user, authStatus } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  useEffect(() => {
    if (!user && authStatus !== 'REFRESHING') {
      navigate('/')
    }
  }, [user, navigate, authStatus])
  return <div>Dashboard</div>
}
export default Dashboard
