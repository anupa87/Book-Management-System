import { Grid } from '@mui/material'
import Menu from './nav/Menu'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'

import theme from '../../styles/theme'

const Layout = ({ CurrentUser }) => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 0 }}>
        <Grid container>
          <Grid item xs={12} md={3} sx={{ paddingLeft: 0 }}>
            <Menu foundUser={CurrentUser} />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{ mt: `calc(${theme.mixins.toolbar.minHeight}px)`, padding: 0 }}>
            <Outlet />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default Layout
