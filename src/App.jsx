import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicPage from './pages/PublicPage'
import ErrorPage from './pages/ErrorPage'
import Layout from './components/common/Layout'
import { AdminRoute, CommonRoute } from './routes/Routes'
import Dashboard from './pages/Dashboard'
import Books from './pages/Library'
import Help from './pages/Help'
import AddUser from './features/user/components/AddUser'
import UpdateUser from './features/user/components/UpdateUser'
import AddBook from './features/book/components/BookForm'
import UpdateBook from './features/book/components/UpdateBook'
import Book from './pages/Book'
import MyAccount from './pages/MyAccount'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PublicPage />} />
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/admin/adduser" element={<AddUser />} />
            <Route path="/admin/users/:userId" element={<UpdateUser />} />
            <Route path="/admin/addbook" element={<AddBook />} />
            <Route path="/admin/books/:id" element={<UpdateBook />} />
          </Route>

          <Route path="/" element={<CommonRoute />}>
            <Route path="/books" element={<Books />} />
            <Route path="/my_account" element={<MyAccount />} />
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
