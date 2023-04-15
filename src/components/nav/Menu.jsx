import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box, List, ListItemIcon, ListItemText, Drawer, ListItemButton } from '@mui/material'
import menuItems from './constant/menuItem'

import logo from '../../../public/assests/logo.png'

import { logoutSuccess, selectCurrentRole } from '../../features/auth/authSlice'

const Menu = () => {
  const currentRole = useSelector(selectCurrentRole)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Filter menu items based on user's role
  const filteredMenuItems = menuItems.filter(
    (item) => item.role === currentRole?.toLowerCase() || item.role === 'both'
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" anchor="left" sx={{ bgcolor: 'primary.main' }}>
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
                  localStorage.removeItem('currentUser')
                  localStorage.removeItem('currentRole')
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
  )
}

export default Menu
