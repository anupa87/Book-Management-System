import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Unauthorized from './Unauthorized'

const AdminRoute = ({ children }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth)
  return isLoggedIn && role === 'admin' ? <Outlet /> : <Unauthorized />
}

export default AdminRoute
