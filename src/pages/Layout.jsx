import { Grid } from '@mui/material'
import Menu from '../components/nav/Menu'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'

import theme from '../theme'

const Layout = ({ CurrentUser }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Menu foundUser={CurrentUser} />
        </Grid>
        <Grid item xs={12} md={9} sx={{ mt: '10' }}>
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Layout
