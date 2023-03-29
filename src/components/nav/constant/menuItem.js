import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import BookIcon from '@mui/icons-material/Book'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import LogoutIcon from '@mui/icons-material/Logout'

const menuItems = [
  {
    label: 'Dashboard',
    icon: React.createElement(DashboardIcon),
    path: '/dashboard',
    role: 'Admin'
  },
  { label: 'Home', icon: React.createElement(HomeIcon), path: '/home', role: 'User' },
  { label: 'Books', icon: React.createElement(BookIcon), path: '/books', role: 'Both' },
  { label: 'Users', icon: React.createElement(PeopleIcon), path: '/users', role: 'Admin' },
  { label: 'Profile', icon: React.createElement(PersonIcon), path: '/profile', role: 'User' },
  { label: 'Settings', icon: React.createElement(SettingsIcon), path: '/setting', role: 'Both' },
  { label: 'Help', icon: React.createElement(HelpIcon), path: '/help', role: 'Both' },
  { label: 'Logout', icon: React.createElement(LogoutIcon), path: '/logout', role: 'Both' }
]

export default menuItems
