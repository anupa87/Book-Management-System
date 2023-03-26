import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'

// import { Provider } from 'react-redux'

// import { store } from './store'
import App from './App'
import './index.css'
import Users from './pages/Users'
// import Help  from './components/Help'
// import  Settings  from './components/Help'
// import  Logout  from './components/Help'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// )
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logout />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
