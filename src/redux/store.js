import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bookReducer from '../features/book/slices/bookSlice'
import userReducer from '../features/user/slices/userSlice'
import authReducer from '../features/auth/slices/authSlice'

const rootReducer = combineReducers({
  books: bookReducer,
  users: userReducer,
  auth: authReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
