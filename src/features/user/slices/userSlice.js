import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import userService from '../services/userService'

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const users = await userService.getAllUsers()
  console.log(users)
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
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
        console.log('getAllUsers.fulfilled:', action.payload)
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log('getAllUsers.rejected:', action.error.message)
      })
      .addCase(getUserById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedUser = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedUserIndex = state.users.findIndex((user) => user.id === action.payload.id)
        state.users[updatedUserIndex] = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = state.users.filter((user) => user.userId !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer
