import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    },
    updateUser: (state, action) => {
      const { id, ...updatedUser } = action.payload
      const index = state.findIndex((user) => user.id === id)
      state[index] = updatedUser
    },
    deleteUser: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload)
      state.splice(index, 1)
    }
  }
})

export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
