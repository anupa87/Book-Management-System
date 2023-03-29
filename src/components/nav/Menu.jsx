import { useSelector } from 'react-redux'

import { ThemeProvider } from '@emotion/react'
import { Box, List, ListItemIcon, ListItemText, Drawer, ListItemButton } from '@mui/material'
import menuItems from './constant/menuItem'

import theme from '../../theme'
import logo from '../../assests/logo.png'

const Menu = () => {
  const user = useSelector((state) => (state.auth.role ? state.auth : null)) // get the users array from the Redux store
  console.log(user)
  const role = user && user.role // get user's role from the the user object
  console.log(role)

  // Filter menu items based on user's role
  const filteredMenuItems = menuItems.filter((item) => item.role === role || item.role === 'Both')
  console.log(filteredMenuItems)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" anchor="left" sx={{ bgcolor: theme.palette.primary.main }}>
          <Box sx={{ p: 2 }}>
            <img src={logo} alt="Logo" height={80} />
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
