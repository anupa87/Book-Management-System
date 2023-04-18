import { useState } from 'react'
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
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'

import getMenuItems from './constant/menuItem'
import logo from '../../../public/assests/logo.png'
import { logoutSuccess, selectCurrentRole } from '../../features/auth/authSlice'

const drawerWidth = 240

const Menu = () => {
  const currentRole = useSelector(selectCurrentRole)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (item) => {
    if (item.path === '/logout') {
      dispatch(logoutSuccess())
      localStorage.removeItem('currentUser')
      localStorage.removeItem('currentRole')
      localStorage.setItem('isLoggedIn', 'false')
      navigate('/')
    } else {
      navigate(item.path)
    }
  }

  // Filter menu items based on user's role
  const filteredMenuItems = getMenuItems(currentUser).filter(
    (item) => item.role === currentRole?.toLowerCase() || item.role === 'both'
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
