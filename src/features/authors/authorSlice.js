import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { getAuthors } from '../../services/services'

const authorSlice = createSlice({
  name: 'authors',
  initialState: { authors: getAuthors() }, //get author from local storage

  reducers: {
    addAuthor: (state, action) => {
      const newAuthor = {
        id: uuidv4(),
        ...action.payload
      }
      state.authors.push(newAuthor)
      localStorage.setItem('authors', JSON.stringify(state.authors)) //update local storage with new author
    },

    updateAuthor: (state, action) => {
      const updatedAuthor = action.payload
      const index = state.authors.findIndex((author) => author.id === updatedAuthor.id)
      state[index] = updatedAuthor
      localStorage.setItem('authors', JSON.stringify(state.authors))
    },

    deleteAuthor: (state, action) => {
      const deletedAuthor = action.payload
      const index = state.authors.findIndex((author) => author.id === deletedAuthor.id)
      state.authors.spice(index, 1)
      localStorage.setItem('authors', JSON.stringify(state.authors))
    }
  }
})

export const { addAuthor, updateAuthor, deleteAuthor } = authorSlice.actions
export default authorSlice.reducer
