import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Grid } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

import theme from '../theme'
import Login from '../components/login/Login'
import Menu from '../components/nav/Menu'

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
        </Grid>
      </Grid>
      {role ? null : <Login />}
    </ThemeProvider>
  )
}

export default Layout

// APP
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/Layout'
import Login from './components/login/Login'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Books from './pages/Books'
import Users from './pages/Users'
import User from './pages/User'
import Setting from './pages/Setting'
import Help from './pages/Help'
import ErrorPage from './pages/ErrorPage'

import AddUser from './components/forms/AddUserForm'
import UpdateUser from './components/admin/UpdateUser'
import AddBook from './components/forms/AddBookForm'
import IssueBook from './components/admin/IssuedBooks'

function App() {
  const { isLoggedIn, role } = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Layout />}>
            {role === 'admin' && <Route path="/dashboard" element={<Dashboard />} />}
            <Route path="/home" element={<Homepage />} />
            <Route path="/books" element={<Books />} />
            <Route path="/users" element={<Users />} />
            <Route path="/updateuser" element={<UpdateUser />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/help" element={<Help />} />
          </Route>
        ) : (
          <Route path="/*" element={<Login />} />
        )}
        {/* <Route path="/*" element={<ErrorPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
