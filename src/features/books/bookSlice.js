import { createSlice } from '@reduxjs/toolkit'
import data from '../../../public/data/data.json'

const bookSlice = createSlice({
  name: 'books',
  initialState: data.books,

  reducers: {
    addBook: (state, action) => {
      const addedBook = {
        ...action.payload
      }
      return [...state, addedBook]
    },

    updateBook: (state, action) => {
      const updatedBook = action.payload
      return [updatedBook, ...state.filter((b) => b.ISBN !== updatedBook.ISBN)]
    },

    deleteBook: (state, action) => {
      const deletedBookISBN = action.payload
      return [...state.filter((book) => book.ISBN !== deletedBookISBN)]
    }
  }
})

export const { addBook, updateBook, deleteBook } = bookSlice.actions
export default bookSlice.reducer
