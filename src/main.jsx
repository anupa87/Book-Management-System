import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Books from './pages/Books'
import Users from './pages/Users'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import Help from './pages/Help'

import AddUser from './components/admin/AddUser'
import UpdateUser from './components/admin/UpdateUser'
import AddAuthor from './components/admin/AddAuthor'
import AddBook from './components/admin/AddBook'
import IssueBook from './components/admin/IssueBook'

import './index.css'
import UserProfile from './components/users/UserProfile'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
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
    </Provider>
  </React.StrictMode>
)
