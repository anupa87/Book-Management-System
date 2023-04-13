import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import data from '../../../public/data/data.json'

const userSlice = createSlice({
  name: 'users',
  initialState: data.users, //get user from data.json

  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: uuidv4(), // generate a unique id
        ...action.payload
      }
      return [...state, newUser]
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload
      const user = state.find((user) => user.id === updatedUser.id)

      return [{ ...user, ...updatedUser }, ...state.filter((user) => user.id !== updatedUser.id)]
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
