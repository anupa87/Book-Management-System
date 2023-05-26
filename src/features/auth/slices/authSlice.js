import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/authService'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    currentUser: null,
    currentRole: null
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
      state.currentUser = action.payload.user
      state.currentRole = action.payload.user.role
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
      state.currentRole = null
    }
  }
})

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const token = await authService.login(credentials)
    const decodedToken = jwt_decode(token)
    const { role, email, firstName, lastName } = decodedToken

    const user = {
      userId: decodedToken.user_id,
      email,
      role,
      firstName,
      lastName
    }

    dispatch(loginSuccess({ user }))

    return token
  } catch (error) {
    dispatch(loginFail(error.message))
  }
}

export const logoutUser = () => async (dispatch) => {
  authService.logout()
  dispatch(logout())
}

export default authSlice.reducer
