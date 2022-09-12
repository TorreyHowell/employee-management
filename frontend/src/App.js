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
import PrivateRoute from './components/PrivateRoute'
import Clients from './pages/Clients'
import PrivateAdminRoute from './components/PrivateAdminRoute'
import PrivateOwnerRoute from './components/privateOwnerRoute'
import NotVerified from './pages/NotVerified'
import Client from './pages/Client'
import Inbox from './pages/Inbox'
import Bill from './pages/Bill'
import Users from './pages/Users'
import UserAdmin from './pages/UserAdmin'
import InvoiceHistory from './pages/InvoiceHistory'
import Contractors from './pages/Contractors'

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
          <Container maxWidth="sm">
            <Routes>
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-invoices" element={<PrivateRoute />}>
                <Route path="/my-invoices" element={<MyInvoices />} />
              </Route>
              <Route path="/clients" element={<PrivateAdminRoute />}>
                <Route path="/clients" element={<Clients />} />
              </Route>
              <Route path="/client/:id" element={<PrivateOwnerRoute />}>
                <Route path="/client/:id" element={<Client />} />
              </Route>
              <Route path="/bill/:id" element={<PrivateOwnerRoute />}>
                <Route path="/bill/:id" element={<Bill />} />
              </Route>
              <Route path="/inbox" element={<PrivateAdminRoute />}>
                <Route path="/inbox" element={<Inbox />} />
              </Route>
              <Route path="/users" element={<PrivateOwnerRoute />}>
                <Route path="/users" element={<Users />} />
              </Route>
              <Route path="/contractors" element={<PrivateOwnerRoute />}>
                <Route path="/contractors" element={<Contractors />} />
              </Route>
              <Route path="/admin/profile/:id" element={<PrivateOwnerRoute />}>
                <Route path="/admin/profile/:id" element={<UserAdmin />} />
              </Route>

              <Route path="/invoice-history" element={<PrivateOwnerRoute />}>
                <Route path="/invoice-history" element={<InvoiceHistory />} />
              </Route>
              <Route path="/not-verified" element={<NotVerified />} />
            </Routes>
          </Container>
        </Router>
        <ToastContainer theme="dark" />
      </ThemeProvider>
    </>
  )
}

export default App
