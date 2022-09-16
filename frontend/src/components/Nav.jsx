import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import MailIcon from '@mui/icons-material/Mail'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ConstructionIcon from '@mui/icons-material/Construction'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Loading from './Loading'

function Nav() {
  const { user, authStatus } = useSelector((state) => state.auth)

  const { loggedIn, isAdmin, isOwner, isVerified } = useAuthStatus()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
  }

  if (!loggedIn) return <></>
  if (authStatus === 'LOADING') return <Loading />
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          marginBottom: 2,
        }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="sm"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box onClick={() => navigate('/dashboard')}>
              <Typography
                sx={{
                  cursor: 'pointer',
                }}
                variant="h6"
              >
                {user && user?.name}
              </Typography>
            </Box>

            <IconButton
              size="large"
              edge="start"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          component={'div'}
          onClick={() => setDrawerOpen(false)}
          sx={{
            width: 250,
          }}
        >
          {isVerified && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/dashboard')}>
                  <ListItemIcon>
                    <DashboardCustomizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/my-invoices')}>
                  <ListItemIcon>
                    <RequestQuoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Invoices" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {(isAdmin || isOwner) && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/clients')}>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clients" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {isOwner && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/users')}>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/contractors')}>
                  <ListItemIcon>
                    <ConstructionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Contractors" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/accounting')}>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accounting" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/invoice-history')}>
                  <ListItemIcon>
                    <RequestQuoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Invoice History" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/inbox')}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <ListItem
            sx={{
              marginTop: 4,
            }}
            disablePadding
          >
            <ListItemButton onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </>
  )
}
export default Nav
