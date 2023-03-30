import Login from '../components/login/Login'
import Dashboard from '../pages/Dashboard'
import Homepage from '../pages/Homepage'
import Books from '../pages/Books'
import Users from '../pages/Users'
import Authors from '../pages/Authors'
import Profile from '../pages/Profile'
import Setting from '../pages/Setting'
import Help from '../pages/Help'
import ErrorPage from '../pages/ErrorPage'

const routes = [
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/*',
    exact: true,
    component: ErrorPage
  },

  {
    path: '/dashboard',
    exact: true,
    component: Dashboard
  },
  {
    path: '/homepage',
    exact: true,
    component: Homepage
  },
  {
    path: '/users',
    exact: true,
    component: Users
  },
  {
    path: '/books',
    exact: true,
    component: Books
  },
  {
    path: '/authors',
    exact: true,
    component: Authors
  },
  {
    path: '/profile',
    exact: true,
    component: Profile
  },
  {
    path: '/setting',
    exact: true,
    component: Setting
  },
  {
    path: '/help',
    exact: true,
    component: Help
  }
]

export default routes
