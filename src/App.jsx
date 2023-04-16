import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicPage from './pages/PublicPage'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './components/routes/ProtectedRoute'
import AdminRoute from './components/routes/AdminRoute'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Users from './pages/Users'
import User from './components/admin/UpdateUser'
import Setting from './pages/Setting'
import Help from './pages/Help'
import AddUser from './components/admin/AddUserForm'
import UpdateUser from './components/admin/UpdateUser'
import AddBook from './components/admin/AddBookForm'
import UpdateBook from './components/admin/UpdateBook'
import IssueBook from './components/admin/IssuedBooks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PublicPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/books/:id" element={<User />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/adduser" element={<AddUser />} />
              <Route path="/dashboard/updateuser" element={<UpdateUser />} />
              <Route path="/dashboard/addbook" element={<AddBook />} />
              <Route path="/dashboard/updatebook" element={<UpdateBook />} />
              <Route path="/dashboard/issuebook" element={<IssueBook />} />
            </Route>
            <Route path="/users" element={<Users />} />
            <Route path="/books" element={<Books />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
