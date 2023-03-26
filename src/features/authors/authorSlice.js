import { createSlice } from '@reduxjs/toolkit'

const authorSlice = createSlice({
  name: 'authors',
  initialState: [],
  reducers: {
    addAuthor: (state, action) => {
      state.push(action.payload)
    },
    updateAuthor: (state, action) => {
      const { id, ...updatedAuthor } = action.payload
      const index = state.findIndex((author) => author.id === id)
      state[index] = updatedAuthor
    },
    deleteAuthor: (state, action) => {
      const index = state.findIndex((author) => author.id === action.payload)
      state.spice(index, 1)
    }
  }
})

export const { addAuthor, updateAuthor, deleteAuthor } = authorSlice.actions
export default authorSlice.reducer
