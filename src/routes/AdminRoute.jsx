import { useSelector } from 'react-redux'
import Unauthorized from './Unauthorized'
import Layout from '../components/common/Layout.jsx'

const AdminRoute = () => {
  const { isLoggedIn, currentRole: role } = useSelector((state) => state.auth)
  return isLoggedIn && role === 'ADMIN' ? <Layout /> : <Unauthorized />
}

export default AdminRoute
