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
