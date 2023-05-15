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
      const token = response.data.token
      sessionStorage.setItem('token', token)
      return token
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },

  logout() {
    sessionStorage.removeItem('token')
  },

  isAuthenticated() {
    const token = sessionStorage.getItem('token')
    return token !== null
  },

  async getCurrentUser() {
    try {
      const token = sessionStorage.getItem('token')
      const decodedToken = jwtDecode(token)
      return {
        userId: decodedToken.user_id,
        email: decodedToken.email,
        role: decodedToken.role // add this line
      }
    } catch (error) {
      throw new Error('Failed to retrieve current user')
    }
  }
}

export default AuthService
