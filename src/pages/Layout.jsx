import Menu from '../components/nav/Menu'
import ProtectedRoute from '../components/routes/ProtectedRoute'
import AdminRoute from '../components/routes/AdminRoute'

const Layout = ({ CurrentUser }) => {
  return (
    <>
      <Menu foundUser={CurrentUser} />

      <ProtectedRoute />
    </>
  )
}

export default Layout
