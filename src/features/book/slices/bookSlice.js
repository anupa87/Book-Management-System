import { createSlice } from '@reduxjs/toolkit'
import data from '../../../data/data.json'

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: data.books,
    borrowedBooks: [],
    issuedBooks: [],
    search: ''
  },
  reducers: {
    addBook: (state, action) => {
      const addedBook = action.payload

      return { ...state, books: [...state.books, addedBook] }
    },

    updateBook: (state, action) => {
      const updatedBook = action.payload
      const book = state.find((book) => book.ISBN === updatedBook.ISBN)
      return [
        { ...book, ...updatedBook },
        ...state.filter((book) => book.ISBN !== updatedBook.ISBN)
      ]
    },

    deleteBook: (state, action) => {
      const deletedBookISBN = action.payload
      return [...state.filter((book) => book.ISBN !== deletedBookISBN)]
    },

    search(state, action) {
      state.search = action.payload
    },

    borrowBook(state, action) {
      const borrowedBook = action.payload
      return {
        ...state,
        borrowedBooks: [...state.borrowedBooks, borrowedBook],
        books: state.books.map((book) =>
          book.ISBN === borrowedBook.ISBN ? { ...book, status: 'unavailable' } : book
        )
      }
    },

    issueBook(state, action) {
      const issuedBook = action.payload
      return {
        ...state,
        issuedBooks: [...state.issuedBooks, issuedBook],
        books: state.books.map((book) =>
          book.ISBN === issuedBook.ISBN ? { ...book, status: 'unavailable' } : book
        )
      }
    }
  }
})

export const { addBook, updateBook, deleteBook, search, borrowBook, issueBook } = bookSlice.actions
export default bookSlice.reducer
