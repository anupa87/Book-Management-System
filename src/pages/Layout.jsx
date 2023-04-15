import { Grid } from '@mui/material'
import Menu from '../components/nav/Menu'
import { Outlet } from 'react-router-dom'

const Layout = ({ CurrentUser }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Menu foundUser={CurrentUser} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default Layout
