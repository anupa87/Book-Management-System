import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Layout from './pages/Layout'
import Dashboard from './components/Dashboard'
import BooksList from './components/BooksList'
import MembersList from './components/MembersList'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/members" element={<MembersList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
