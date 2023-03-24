import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    books: booksReducer
  }
})
