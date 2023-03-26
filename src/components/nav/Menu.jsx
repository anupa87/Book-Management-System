import React from 'react'

import { Box, List, ListItemIcon, ListItemText, Drawer, ListItemButton } from '@mui/material'
import menuItems from './constant/menuItem'

import { ThemeProvider } from '@emotion/react'
import theme from '../../theme'

const Menu = ({ role }) => {
  // Filter menu items based on user's role
  const filteredMenuItems = menuItems.filter((item) => item.role === role || item.role === 'both')

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" anchor="left" sx={{ bgcolor: theme.palette.primary.main }}>
          <List>
            {filteredMenuItems.map((item) => (
              <ListItemButton key={item.label} component="a" href={item.path}>
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
