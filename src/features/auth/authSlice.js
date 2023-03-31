import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    id: null,
    role: null,
    firstName: ''
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.role = action.payload.role
      state.id = action.payload.id
      state.firstName = action.payload.firstName
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.role = null
      state.id = null
      state.firstName = ''
    }
  }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer
