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
import UpdateBook from './components/admin/UpdateBook'
import IssueBook from './components/admin/IssuedBooks'
import ProtectedRoute from './components/routes/ProtectedRoute'
import AdminRoute from './components/routes/AdminRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/books" element={<Books />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/help" element={<Help />} />
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/updateuser" element={<UpdateUser />} />
              <Route path="/users" element={<Users />} />
              <Route path="/addbook" element={<AddBook />} />
              <Route path="/updatebook" element={<UpdateBook />} />
              <Route path="/issuebook" element={<IssueBook />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
