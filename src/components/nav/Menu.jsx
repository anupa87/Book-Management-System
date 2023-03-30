import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'
import { Box, List, ListItemIcon, ListItemText, Drawer, ListItemButton } from '@mui/material'
import menuItems from './constant/menuItem'

import theme from '../../theme'
import logo from '../../assests/logo.png'

import { logoutSuccess } from '../../features/auth/authSlice'

const Menu = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => (state.auth.role ? state.auth : null)) // get the users array from the Redux store
  const role = user && user.role // get user's role from the the user object

  // Filter menu items based on user's role
  const filteredMenuItems = menuItems.filter((item) => item.role === role || item.role === 'both')

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" anchor="left" sx={{ bgcolor: theme.palette.primary.main }}>
          <Box sx={{ p: 2 }}>
            <img src={logo} alt="Logo" height={80} />
          </Box>
          <List sx={{ mt: 10, ml: 3 }}>
            {filteredMenuItems.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => {
                  if (item.path === '/logout') {
                    dispatch(logoutSuccess())
                    navigate('/')
                  } else {
                    navigate(item.path)
                  }
                }}
                sx={{ mb: 2 }}>
                <ListItemIcon>
                  <i className="material-icons">{item.icon}</i>
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  )
}

export default Menu
