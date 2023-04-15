import { useSelector } from 'react-redux'
import Unauthorized from './Unauthorized'
import Layout from '../../pages/Layout.jsx'

const AdminRoute = () => {
  const { isLoggedIn, currentRole: role } = useSelector((state) => state.auth)
  return isLoggedIn && role === 'admin' ? <Layout /> : <Unauthorized />
}

export default AdminRoute
