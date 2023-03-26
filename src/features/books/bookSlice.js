import { createSlice } from '@reduxjs/toolkit'

const bookSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload)
    },
    updateBook: (state, action) => {
      const { id, ...updatedBook } = action.payload
      const index = state.findIndex((book) => book.id === id)
      state[index] = updatedBook
    },
    deleteBook: (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload)
      state.splice(index, 1)
    }
  }
})

export const { addBook, updateBook, deleteBook } = bookSlice.actions
export default bookSlice.reducer
