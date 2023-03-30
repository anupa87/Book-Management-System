import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Grid } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

import theme from '../theme'
import Login from '../components/login/Login'
import Menu from '../components/nav/Menu'
import Homepage from './Homepage'
import Dashboard from './Dashboard'

const Layout = () => {
  const role = useSelector((state) => state.auth.role)
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={25}>
        <Grid item xs={2}>
          <Menu role={role} />
        </Grid>
        <Grid item xs={10}>
          <Outlet />
          {role === 'user' && <Homepage />}
          {role === 'admin' && <Dashboard />}
        </Grid>
      </Grid>
      {role ? null : <Login />}
    </ThemeProvider>
  )
}

export default Layout
