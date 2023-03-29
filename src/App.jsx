import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/Layout'
import Login from './components/googleLogin/Login'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Books from './pages/Books'
import Users from './pages/Users'
import Authors from './pages/Authors'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import Help from './pages/Help'
import ErrorPage from './pages/ErrorPage'

import AddUser from './components/admin/AddUser'
import UpdateUser from './components/admin/UpdateUser'
import AddAuthor from './components/admin/AddAuthor'
import AddBook from './components/admin/AddBook'
import IssueBook from './components/admin/IssueBook'
import UserProfile from './components/users/UserProfile'

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/addauthor" element={<AddAuthor />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
          <Route path="/issuebook" element={<IssueBook />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
