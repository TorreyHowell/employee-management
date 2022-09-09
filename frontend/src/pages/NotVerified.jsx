import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NotVerified() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.verifiedUser) {
      navigate('/dashboard')
    }

    if (!user) {
      navigate('/')
    }
  }, [user, navigate])
  return (
    <Typography variant="h6" align="center">
      Wait for admin to verify account
    </Typography>
  )
}
export default NotVerified
