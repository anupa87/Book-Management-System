import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/Layout'
import Login from './components/login/Login'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Books from './pages/Books'
import Users from './pages/Users'
import User from './components/admin/UpdateUser'
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
        <Route path="/user/users" element={<Users />} />
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/user" element={<Layout />}>
          <Route element={<ProtectedRoute />} path="*">
            <Route path="/user/" element={<Homepage />} />
            <Route path="/user/books" element={<Books />} />
            <Route path="/user/users/:id" element={<User />} />
            <Route path="/user/setting" element={<Setting />} />
            <Route path="/user/help" element={<Help />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/user/dashboard" element={<Dashboard />}>
              <Route path="/user/dashboard/adduser" element={<AddUser />} />
              <Route path="/user/dashboard/updateuser" element={<UpdateUser />} />
              <Route path="/user/dashboard/addbook" element={<AddBook />} />
              <Route path="/user/dashboard/updatebook" element={<UpdateBook />} />
              <Route path="/user/dashboard/issuebook" element={<IssueBook />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
