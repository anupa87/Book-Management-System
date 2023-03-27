import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { getBooks } from '../../services/services'

const bookSlice = createSlice({
  name: 'books',
  initialState: { books: getBooks() }, //get books from local storage

  reducers: {
    addBook: (state, action) => {
      const newBook = {
        id: uuidv4(),
        ...action.payload
      }
      state.books.push(newBook)
      localStorage.setItem('books', JSON.stringify(state.books))
    },

    updateBook: (state, action) => {
      const updatedBook = action.payload
      const index = state.books.findIndex((book) => book.id === updatedBook.id)
      state[index] = updatedBook
      localStorage.setItem('books', JSON.stringify(state.books))
    },

    deleteBook: (state, action) => {
      const deletedBook = action.payload
      const index = state.books.findIndex((book) => book.id === deletedBook.id)
      state.books.splice(index, 1)
      localStorage.setItem('books', JSON.stringify(state.books))
    }
  }
})

export const { addBook, updateBook, deleteBook } = bookSlice.actions
export default bookSlice.reducer
