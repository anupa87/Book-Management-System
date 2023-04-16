import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import BookIcon from '@mui/icons-material/Book'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import LogoutIcon from '@mui/icons-material/Logout'

const getMenuItems = (currentUser) => [
  { label: 'Home', icon: React.createElement(HomeIcon), path: '/homepage', role: 'user' },
  {
    label: 'Dashboard',
    icon: React.createElement(DashboardIcon),
    path: '/dashboard',
    role: 'admin'
  },
  { label: 'Books', icon: React.createElement(BookIcon), path: '/books', role: 'admin' },
  { label: 'Users', icon: React.createElement(PeopleIcon), path: '/users', role: 'admin' },
  {
    label: 'Profile',
    icon: React.createElement(PersonIcon),
    path: '/user/' + currentUser.id,
    role: 'user'
  },
  {
    label: 'Settings',
    icon: React.createElement(SettingsIcon),
    path: '/user/setting',
    role: 'both'
  },
  { label: 'Help', icon: React.createElement(HelpIcon), path: '/user/help', role: 'both' },
  { label: 'Logout', icon: React.createElement(LogoutIcon), path: '/logout', role: 'both' }
]

export default getMenuItems
