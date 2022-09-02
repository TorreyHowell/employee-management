import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const { height } = useWindowDimensions()
  const { user, authStatus, message } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user || authStatus === 'SUCCESS') {
      navigate('/dashboard')
    }

    if (authStatus === 'ERROR') {
      toast.error(message)
    }
  }, [user, authStatus, navigate, message])

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
  }

  return (
    <>
      <Stack
        sx={{
          height: `${height}px`,
          minHeight: 300,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            width: { xs: '80%', sm: 400 },
          }}
        >
          <Typography mb={1} align="center" variant="h3">
            Login
          </Typography>

          <FormControl component={'form'} onSubmit={onSubmit} fullWidth>
            <TextField
              fullWidth
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChange}
              margin="dense"
            />
            <TextField
              fullWidth
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={onChange}
              margin="dense"
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Button fullWidth variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Stack>
    </>
  )
}
export default Login
