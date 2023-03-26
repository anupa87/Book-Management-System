import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './components/nav/Menu'
import { Grid } from '@mui/material'
import theme from './theme'
import { ThemeProvider } from '@emotion/react'

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <ThemeProvider theme={theme}>
      {loggedIn ? (
        <Grid container spacing={25}>
          <Grid item xs={2}>
            <Menu />
          </Grid>
          <Grid item xs={10}>
            <Outlet />
          </Grid>
        </Grid>
      ) : (
        <Login />
      )}
    </ThemeProvider>
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
