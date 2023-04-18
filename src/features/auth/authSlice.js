import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    currentRole: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.currentUser = action.payload.user
      state.currentRole = action.payload.role
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.currentUser = null
      state.currentRole = null
    },

    updateCurrentUserBorrowedBooks: (state, action) => {
      state.currentUser.borrowedBooks = action.payload
    },

    updatePassword: (state, action) => {
      state.currentUser.password = action.payload
    }
  }
})

export const { loginSuccess, logoutSuccess, updateCurrentUserBorrowedBooks, updatePassword } =
  authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.currentUser
export const selectCurrentRole = (state) => state.auth.currentRole
