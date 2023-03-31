import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { getUsers } from '../../services/services'

const userSlice = createSlice({
  name: 'users',
  initialState: { users: getUsers() }, //get user from local storage

  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: uuidv4(), // generate a unique id
        ...action.payload
      }
      state.users.push(newUser)
      localStorage.setItem('users', JSON.stringify(state.users)) //update local storage with new data
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload
      state.users = state.users.map((user) => {
        if (user.id === updatedUser.id) {
          return { ...user, ...updatedUser }
        }
        return user
      })
      localStorage.setItem('users', JSON.stringify(state.users))
    },

    deleteUser: (state, action) => {
      const deletedUser = action.payload
      state.users = state.users.filter((user) => user.id !== deletedUser.id)
      localStorage.setItem('users', JSON.stringify(state.users))
    }
  }
})
export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
