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
      const index = state.users.findIndex((user) => user.id === updatedUser.id)
      if (index >= 0) {
        state[index] = updatedUser
      }
      localStorage.setItem('users', JSON.stringify(state.users))
    },
    deleteUser: (state, action) => {
      const deletedUser = action.payload
      const index = state.users.findIndex((user) => user.id === deletedUser.id)
      state.users.splice(index, 1)
      localStorage.setItem('users', JSON.stringify(state.users))
    }
  }
})
export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
