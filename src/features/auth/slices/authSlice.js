import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/authService'
import jwtDecode from 'jwt-decode'

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
      state.currentUser = {
        userId: action.payload.userId,
        email: action.payload.email,
        role: action.payload.role,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
      state.currentRole = action.payload.role
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
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    signupStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      state.currentUser = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        role: action.payload.role
      }
      state.currentRole = action.payload.role
    },
    signupFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
  setCurrentUser,
  signupStart,
  signupSuccess,
  signupFail
} = authSlice.actions

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const response = await authService.login(credentials)

    const { token } = response.data
    const decodedToken = jwtDecode(token)
    const { userId, firstName, lastName, email, role } = decodedToken

    dispatch(loginSuccess({ userId, firstName, lastName, email, role }))

    return token
  } catch (error) {
    dispatch(loginFail(error.message))
  }
}

export const logoutUser = () => async (dispatch) => {
  authService.logout()
  dispatch(logout())
}

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const currentUser = await authService.getCurrentUser()
    const { userId, email, role, firstName, lastName } = currentUser
    dispatch(setCurrentUser({ userId, email, role, firstName, lastName }))
  } catch (error) {
    console.error('Failed to fetch current user', error)
  }
}
export const signup = (user) => async (dispatch) => {
  dispatch(signupStart())
  try {
    const response = await authService.signup(user)

    const { token } = response.data
    const decodedToken = jwtDecode(token)
    const { userId, firstName, lastName, email, role } = decodedToken

    dispatch(signupSuccess({ userId, firstName, lastName, email, role }))

    return token
  } catch (error) {
    dispatch(signupFail(error.message))
    throw new Error(error.response.data.error)
  }
}

export const selectCurrentUser = (state) => state.auth.currentUser

export default authSlice.reducer
