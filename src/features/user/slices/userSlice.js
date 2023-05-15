import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import userService from '../services/userService'

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const users = await userService.getAllUsers()
  return users
})

export const getUserById = createAsyncThunk('users/getUserById', async (userId) => {
  const user = await userService.getUserById(userId)
  return user
})

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const newUser = await userService.addUser(user)
  return newUser
})

export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, user }) => {
  const updatedUser = await userService.updateUser(userId, user)
  return updatedUser
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await userService.deleteUser(userId)
  return userId
})

const initialState = {
  users: [],
  status: 'idle',
  error: null,
  selectedUser: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    }
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.status = 'loading'
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.users = action.payload
    },
    [getAllUsers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [getUserById.pending]: (state) => {
      state.status = 'loading'
    },
    [getUserById.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.selectedUser = action.payload
    },
    [getUserById.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addUser.pending]: (state) => {
      state.status = 'loading'
    },
    [addUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.users.push(action.payload)
    },
    [addUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateUser.pending]: (state) => {
      state.status = 'loading'
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      const updatedUserIndex = state.users.findIndex((user) => user.id === action.payload.id)
      state.users[updatedUserIndex] = action.payload
    },
    [updateUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteUser.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})
export const { setSelectedUser } = userSlice

export default userSlice.reducer
