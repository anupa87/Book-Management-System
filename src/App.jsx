import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Login from './pages/Login'
import Menu from './components/nav/Menu'

import { Grid } from '@mui/material'
import theme from './theme'
import { ThemeProvider } from '@emotion/react'

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  return loggedIn ? (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Menu />
        <Outlet />
      </Grid>
    </ThemeProvider>
  ) : (
    <Login />
  )
}

export default App

/*
loggedIn ? If true => check Role 
      if fole= admin => navigate to Dashboard
      else role= nomral => navigate to user page 
logged in page 

logged? role ===admin ? dashboard : user : loggedinPage

*/
