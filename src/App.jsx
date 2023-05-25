import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicPage from './pages/PublicPage'
import ErrorPage from './pages/ErrorPage'
import Layout from './components/common/Layout'
import { AdminRoute, UserRoute, CommonRoute } from './routes/Routes'
import HomePage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Users from './pages/Users'
import Help from './pages/Help'
import AddUser from './features/user/components/AddUser'
import UpdateUser from './features/user/components/UpdateUser'
import AddBook from './features/book/components/BookForm'
import UpdateBook from './features/book/components/UpdateBook'
import Book from './pages/Book'
import User from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PublicPage />} />
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/adduser" element={<AddUser />} />
            <Route path="/admin/users/:userId" element={<UpdateUser />} />
            <Route path="/admin/addbook" element={<AddBook />} />
            <Route path="/admin/books/:id" element={<UpdateBook />} />
          </Route>
          <Route path="/user" element={<UserRoute />}>
            <Route path="/user/homepage" element={<HomePage />} />
            <Route path="/user/:id" element={<User />} />
          </Route>
          <Route path="/" element={<CommonRoute />}>
            <Route path="/books" element={<Books />} />
            <Route path="/books/:bookId" element={<Book />} />
            <Route path="/help" element={<Help />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
