import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Layout from '../components/common/Layout.jsx'

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  return isLoggedIn ? <Layout /> : <Navigate to="/" replace />
}

export default ProtectedRoute
