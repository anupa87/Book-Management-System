import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bookReducer from './features/books/bookSlice'
import userReducer from './features/users/userSlice'
import authReducer from './features/auth/authSlice'

const rootReducer = combineReducers({
  books: bookReducer,
  users: userReducer,
  auth: authReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
