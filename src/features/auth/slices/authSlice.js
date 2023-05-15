import { createSlice } from '@reduxjs/toolkit'
import AuthService from '../services/authService'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: AuthService.isAuthenticated(),
    isLoading: false,
    error: null,
    currentUserRole: null
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      state.currentUserRole = action.payload.role
    },
    loginFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      state.currentUser = null
    }
  }
})

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const token = await AuthService.login(credentials)
    const currentUser = await AuthService.getCurrentUser()
    dispatch(loginSuccess(currentUser))
    return token
  } catch (error) {
    dispatch(loginFail(error.message))
  }
}

export const logoutUser = () => async (dispatch) => {
  AuthService.logout()
  dispatch(logout())
}

export default authSlice.reducer
