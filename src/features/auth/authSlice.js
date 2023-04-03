import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    id: null,
    role: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.role = action.payload.role
      state.id = action.payload.id
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.role = null
      state.id = null
    }
  }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer
