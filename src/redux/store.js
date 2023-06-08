import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import reduxPersistConfig from './reduxPersistConfig'
import thunk from 'redux-thunk'

import bookReducer from '../features/book/slices/bookSlice'
import userReducer from '../features/user/slices/userSlice'
import authReducer from '../features/auth/slices/authSlice'
import authorReducer from '../features/author/slices/authorSlice'
import categoryReducer from '../features/category/slices/categorySlice'
import transactionReducer from '../features/transaction/slices/transactionSlice'
const rootReducer = combineReducers({
  books: bookReducer,
  users: userReducer,
  auth: authReducer,
  authors: authorReducer,
  categories: categoryReducer,
  transactions: transactionReducer
})

const persistedReducer = persistReducer(reduxPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

const persistor = persistStore(store)

export { store, persistor }
