import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemButton,
  IconButton
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import BookIcon from '@mui/icons-material/Book'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import HelpIcon from '@mui/icons-material/Help'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'

import logo from '../../assets/images/logo.png'
import { logoutUser } from '../../features/auth/slices/authSlice'

const drawerWidth = 240

const getMenuItems = (currentUser) => [
  { label: 'Home', icon: React.createElement(HomeIcon), path: '/user/homepage', role: 'USER' },
  {
    label: 'Dashboard',
    icon: React.createElement(DashboardIcon),
    path: '/admin/dashboard',
    role: 'ADMIN'
  },
  { label: 'Books', icon: React.createElement(BookIcon), path: '/books', role: 'BOTH' },
  { label: 'Users', icon: React.createElement(PeopleIcon), path: '/admin/users', role: 'ADMIN' },
  {
    label: 'Profile',
    icon: React.createElement(PersonIcon),
    path: `/user/${currentUser?.id}`,
    role: 'USER'
  },

  { label: 'Help', icon: React.createElement(HelpIcon), path: '/help', role: 'BOTH' },
  { label: 'Logout', icon: React.createElement(LogoutIcon), path: '/logout', role: 'BOTH' }
]

const Menu = () => {
  const theme = useTheme()

  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentRole = useSelector((state) => state.auth.currentRole)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (item) => {
    if (item.label === 'Logout') {
      dispatch(logoutUser())
      navigate('/login')
    } else {
      navigate(item.path)
    }
  }

  // Filter menu items based on user's role
  const filteredMenuItems = getMenuItems(currentRole).filter(
    (item) => item.role === currentRole || item.role === 'BOTH'
  )

  const drawer = (
    <Box
      sx={{
        bgColor: theme.palette.secondary.main,
        color: 'white'
      }}>
      <Toolbar sx={{ p: 0 }} />
      <Box sx={{ p: 2 }}>
        <img src={logo} alt="Logo" height={80} />
      </Box>
      <List sx={{ mt: 10, ml: 3 }}>
        {filteredMenuItems.map((item) => (
          <ListItemButton key={item.label} onClick={() => handleMenuClick(item)} sx={{ mb: 2 }}>
            <ListItemIcon>
              <i className="material-icons">{item.icon}</i>
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white'
        }}>
        <Toolbar>
          <IconButton
            color={theme.palette.secondary.main}
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          zIndex: theme.zIndex.drawer + 1 // add this line
        }}
        aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#70334E'
            }
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#70334E'
            }
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default Menu
