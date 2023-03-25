import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

const drawerWidth = 300

const theme = createTheme({
  spacing: 10,
  palette: {
    primary: {
      main: '#254670'
    },
    secondary: {
      main: '#70334E'
    },
    white: {
      main: '#FFFFFF'
    }
  }
})

const SideBar = () => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={theme}>
      <IconButton color="secondary" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.primary.main
          },
          '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.white.main
          }
        }}>
        <List sx={{ paddingTop: '150px' }}>
          <ListItemButton sx={{ paddingBottom: '25px' }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton sx={{ paddingBottom: '25px' }}>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItemButton>
          <ListItemButton sx={{ paddingBottom: '25px' }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItemButton>
          <ListItemButton sx={{ paddingBottom: '25px' }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton sx={{ paddingBottom: '25px' }}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItemButton>
        </List>
        <List>
          <ListItemButton sx={{ paddingTop: '50px' }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </ThemeProvider>
  )
}

export default SideBar
