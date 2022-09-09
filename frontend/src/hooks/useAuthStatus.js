import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      if (user.verifiedUser) {
        setIsVerified(true)
      } else {
        setIsVerified(false)
      }

      if (user.admin) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }

      if (user.owner) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
      setIsAdmin(false)
      setIsOwner(false)
      setIsVerified(false)
    }
    setCheckingStatus(false)
  }, [user])

  return { loggedIn, isVerified, isAdmin, isOwner, checkingStatus }
}
