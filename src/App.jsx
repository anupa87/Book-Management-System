import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicPage from './pages/PublicPage'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './components/routes/ProtectedRoute'
import AdminRoute from './components/routes/AdminRoute'
import HomePage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Users from './pages/Users'
import Help from './pages/Help'
import AddUser from './components/admin/AddUserForm'
import UpdateUser from './components/admin/UpdateUser'
import AddBook from './components/admin/AddBookForm'
import UpdateBook from './components/admin/UpdateBook'
import IssueBook from './components/admin/IssueBookForm'
import Book from './components/books/Book'
import User from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PublicPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/book/:ISBN" element={<Book />} />
          <Route path="/users/:id" element={<UpdateUser />} />
          <Route path="/books/:ISBN" element={<UpdateBook />} />
          <Route path="/help" element={<Help />} />
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/adduser" element={<AddUser />} />
              <Route path="/dashboard/users/:id" element={<UpdateUser />} />
              <Route path="/dashboard/addbook" element={<AddBook />} />
              <Route path="/dashboard/books/:ISBN" element={<UpdateBook />} />
              <Route path="/dashboard/issuebook" element={<IssueBook />} />
            </Route>
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
