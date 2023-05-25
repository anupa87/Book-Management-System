import { Grid } from '@mui/material'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'

import theme from '../../styles/theme'

const Layout = ({ CurrentUser }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ padding: 0 }}>
        <Grid item xs={12} md={3} sx={{ width: 'auto', padding: 0 }}>
          <Menu foundUser={CurrentUser} />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{ mt: `calc(${theme.mixins.toolbar.minHeight}px)`, width: 'auto', padding: 0 }}>
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Layout
