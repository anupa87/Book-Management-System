import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    role: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.role = action.payload.role
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.role = null
    }
  }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer
