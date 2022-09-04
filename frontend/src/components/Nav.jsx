import {
  AppBar,
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

function Nav() {
  const { user } = useSelector((state) => state.auth)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

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
            maxWidth="md"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">{user && user?.name}</Typography>
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
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/my-invoices')}>
              <ListItemIcon>
                <RequestQuoteIcon />
              </ListItemIcon>
              <ListItemText primary="My Invoices" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
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
