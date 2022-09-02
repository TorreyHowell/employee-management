import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { refresh } from './features/auth/authSlice'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refresh())
  }, [dispatch])
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Router>
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Container>
        </Router>
        <ToastContainer theme="dark" />
      </ThemeProvider>
    </>
  )
}

export default App
