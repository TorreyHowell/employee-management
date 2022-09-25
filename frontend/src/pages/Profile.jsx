import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeUserEmail,
  changeUserName,
  changeUserPassword,
  reset as resetAuth,
} from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Profile() {
  const { user, authStatus, authMessage } = useSelector((state) => state.auth)

  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
  })

  const [newPassword, setNewPassword] = useState({
    password: '',
    password2: '',
  })

  const [changeName, setChangeName] = useState(true)
  const [changeEmail, setChangeEmail] = useState(true)
  const [changePassword, setChangePassword] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setNewUserData({
        name: user.name,
        email: user.email,
      })
    }

    if (authStatus === 'ERROR') {
      toast.error(authMessage)
    }

    if (authStatus === 'CHANGED') {
      toast.success(authMessage)
    }

    return () => {
      dispatch(resetAuth())
    }
  }, [user, authStatus, authMessage, dispatch])

  const onChange = (e) => {
    setNewUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onPasswordChange = (e) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleNameChange = () => {
    if (newUserData.name.length < 3) {
      return
    }

    dispatch(
      changeUserName({
        name: newUserData.name,
      })
    )
    setChangeName(true)
  }

  const handleEmailChange = (e) => {
    e.preventDefault()
    dispatch(
      changeUserEmail({
        email: newUserData.email,
      })
    )
    setChangeEmail(true)
  }

  const handlePasswordChange = () => {
    if (newPassword.password !== newPassword.password2) {
      return toast.error('Passwords do not match')
    }

    if (newPassword.password.length < 6) {
      return toast.error('Password too short')
    }

    dispatch(changeUserPassword(newPassword))

    setNewPassword({
      password: '',
      password2: '',
    })
    setChangePassword(false)
  }

  return (
    <>
      <Typography align="center" variant="h5" mb={3}>
        My Profile
      </Typography>

      <Stack direction="row">
        <TextField
          label="Name"
          name="name"
          disabled={changeName}
          value={newUserData.name}
          fullWidth
          size="small"
          onChange={onChange}
        />
        {changeName && (
          <Button onClick={() => setChangeName(false)}>Change</Button>
        )}
        {!changeName && <Button onClick={handleNameChange}>Submit</Button>}
      </Stack>

      <Stack
        direction="row"
        mt={2}
        component="form"
        onSubmit={handleEmailChange}
      >
        <TextField
          label="Email"
          type={'email'}
          name="email"
          disabled={changeEmail}
          value={newUserData.email}
          fullWidth
          size="small"
          onChange={onChange}
        />
        {changeEmail && (
          <Button onClick={() => setChangeEmail(false)}>Change</Button>
        )}
        {!changeEmail && <Button type="submit">Submit</Button>}
      </Stack>

      <Box mt={3}>
        {changePassword ? (
          <>
            <Button onClick={handlePasswordChange}>Submit</Button>
            <Button onClick={() => setChangePassword(false)}>Cancel</Button>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={newPassword.password}
                onChange={onPasswordChange}
                size="small"
                fullWidth
              />
              <TextField
                label="Confirm Password"
                name="password2"
                type="password"
                value={newPassword.password2}
                onChange={onPasswordChange}
                size="small"
                fullWidth
              />
            </Stack>
          </>
        ) : (
          <Button onClick={() => setChangePassword(true)}>
            Change Password
          </Button>
        )}
      </Box>
    </>
  )
}
export default Profile
