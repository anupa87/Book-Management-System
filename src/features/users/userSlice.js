import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: { users: [] },

  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: Math.random(),
        ...action.payload
      }
      state.users.push(newUser)
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload
      const index = state.users.findIndex((user) => user.id === updatedUser.id)
      state.users.splice(index, 1, updatedUser)
    },
    deleteUser: (state, action) => {
      const deletedUser = action.payload
      const index = state.users.findIndex((user) => user.id === deletedUser.id)
      state.users.splice(index, 1)
    }
  }
})
export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
