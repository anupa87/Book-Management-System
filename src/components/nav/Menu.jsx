import React from 'react'

import { ThemeProvider } from '@emotion/react'
import { Box, List, ListItemIcon, ListItemText, Drawer, ListItemButton } from '@mui/material'
import menuItems from './constant/menuItem'

import theme from '../../theme'
import logo from '../../assests/logo.png'

const Menu = ({ role }) => {
  // Filter menu items based on user's role
  const filteredMenuItems = menuItems.filter((item) => item.role === role || item.role === 'both')

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" anchor="left" sx={{ bgcolor: theme.palette.primary.main }}>
          <Box sx={{ p: 2 }}>
            <img src={logo} alt="Logo" height={100} />
          </Box>
          <List sx={{ mt: 10, ml: 3 }}>
            {filteredMenuItems.map((item) => (
              <ListItemButton key={item.label} component="a" href={item.path} sx={{ mb: 2 }}>
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
