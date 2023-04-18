import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import data from '../../../public/data/data.json'

const userSlice = createSlice({
  name: 'users',
  initialState: data.users,

  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: uuidv4(),
        ...action.payload
      }
      return [...state, newUser]
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload
      const updatedUsers = state.map((user) => {
        if (user.id === updatedUser.id) {
          return {
            ...user,
            ...updatedUser
          }
        }
        return user
      })

      return updatedUsers
    },

    deleteUser: (state, action) => {
      const deletedUserId = action.payload
      return state.filter((user) => user.id !== deletedUserId)
    }
  }
})
export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer

// Selector function to select all users
export const selectUsers = (state) => state.users
