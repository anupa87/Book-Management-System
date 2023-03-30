import { createSlice } from '@reduxjs/toolkit'
import data from '../../data.json'

import { v4 as uuidv4 } from 'uuid'

const bookSlice = createSlice({
  name: 'books',
  initialState: { books: data.books, issuedBooks: [] },

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
      state.books[index] = updatedBook
      localStorage.setItem('books', JSON.stringify(state.books))
    },

    deleteBook: (state, action) => {
      const deletedBook = action.payload
      const index = state.books.findIndex((book) => book.id === deletedBook.id)
      state.books.splice(index, 1)
      localStorage.setItem('books', JSON.stringify(state.books))
    },

    issueBook: (state, action) => {
      const { bookId, borrowerId } = action.payload
      const issuedBook = state.books.find((book) => book.id === bookId)
      issuedBook.status = 'issued'
      issuedBook.borrowerId = borrowerId
      issuedBook.issueDate = new Date().toISOString()
      state.issuedBooks.push(issuedBook)
      localStorage.setItem('issuedBooks', JSON.stringify(state.issuedBooks))
      localStorage.setItem('books', JSON.stringify(state.books))
    },

    renewBook: (state, action) => {
      const { id, newReturnDate } = action.payload
      const renewedBook = state.issuedBooks.find((book) => book.id === id)
      renewedBook.returnDate = newReturnDate
      localStorage.setItem('issuedBooks', JSON.stringify(state.issuedBooks))
    },

    returnBook: (state, action) => {
      const { id, newStatus } = action.payload
      const returnedBook = state.issuedBooks.find((book) => book.id === id)
      returnedBook.status = newStatus
      returnedBook.borrowerId = ''
      returnedBook.issueDate = ''
      returnedBook.returnDate = ''
      state.issuedBooks = state.issuedBooks.filter((book) => book.id !== id)
      localStorage.setItem('issuedBooks', JSON.stringify(state.issuedBooks))
      localStorage.setItem('books', JSON.stringify(state.books))
    }
  }
})

export const { addBook, updateBook, deleteBook, issueBook, renewBook, returnBook } =
  bookSlice.actions
export default bookSlice.reducer
