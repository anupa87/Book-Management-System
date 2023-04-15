import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminRoute from './AdminRoute'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  console.log(isLoggedIn)
  return isLoggedIn ? (
    <>
      <Outlet />
      <AdminRoute />
    </>
  ) : (
    <Navigate to="/" replace />
  )
}

export default ProtectedRoute
