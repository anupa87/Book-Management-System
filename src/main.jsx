import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { GoogleOAuthProvider } from '@react-oauth/google'
import store from './store'
import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="50821672790-tm4l1bpm7pj6r144bqsuhtcb5t0nbutk.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
