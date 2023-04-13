import { createSlice, createSelector } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUser: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.currentUser = action.payload
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.currentUser = null
    }
  }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = createSelector(
  (state) => state.auth.currentUser,
  (currentUser) => currentUser
)
