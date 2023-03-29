import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bookReducer from './features/books/bookSlice'
import userReducer from './features/users/userSlice'
import authorReducer from './features/authors/authorSlice'
import authReducer from './features/auth/authSlice'

const rootReducer = combineReducers({
  books: bookReducer,
  users: userReducer,
  author: authorReducer,
  auth: authReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
