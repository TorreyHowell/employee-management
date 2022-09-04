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
import { useDispatch, useSelector } from 'react-redux'
import { refresh } from './features/auth/authSlice'
import Nav from './components/Nav'
import MyInvoices from './pages/MyInvoices'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const dispatch = useDispatch()

  const { authStatus } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(refresh())
  }, [dispatch])

  if (authStatus === 'REFRESHING') return <></>
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Router>
          <Nav />
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-invoices" element={<MyInvoices />} />
            </Routes>
          </Container>
        </Router>
        <ToastContainer theme="dark" />
      </ThemeProvider>
    </>
  )
}

export default App
