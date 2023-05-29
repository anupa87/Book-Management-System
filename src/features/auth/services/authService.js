import api from '../../../api/api'

const AuthService = {
  async signup(user) {
    try {
      const response = await api.post('/signup', user)
      return response.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/login', credentials)
      localStorage.setItem('token', response.data.token)
      return response
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },

  logout() {
    // localStorage.removeItem('token')
    // localStorage.removeItem('error')
    localStorage.clear()
  },

  isAuthenticated() {
    const token = localStorage.getItem('token')
    return token !== null
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token')
      const decodedToken = jwtDecode(token)
      return {
        userId: decodedToken.user_id,
        email: decodedToken.email,
        role: decodedToken.role,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName
      }
    } catch (error) {
      throw new Error('Failed to retrieve current user')
    }
  }
}

export default AuthService
