import { useSelector } from 'react-redux'
import Unauthorized from './Unauthorized'
import Layout from '../components/common/Layout.jsx'

const AdminRoute = ({ element: Element }) => {
  const { isAuthenticated, currentRole: role } = useSelector((state) => state.auth)

  if (isAuthenticated && role === 'ADMIN') {
    return <Layout>{Element}</Layout>
  }
  console.log('Access Denied')
  return <Unauthorized />
}

const UserRoute = ({ element: Element }) => {
  const { isAuthenticated, currentRole: role } = useSelector((state) => state.auth)

  if (isAuthenticated && role === 'USER') {
    return <Layout>{Element}</Layout>
  }
  return <Unauthorized />
}

const CommonRoute = ({ element: Element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (isAuthenticated) {
    return <Layout>{Element}</Layout>
  }
  return <Unauthorized />
}

export { AdminRoute, UserRoute, CommonRoute }
