import api from '../../../api/api'

const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users')
    return response.data
  },
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  },
  addUser: async (user) => {
    const response = await api.post('/users', user)
    return response.data
  },
  updateUser: async (userId, user) => {
    const response = await api.put(`/users/${userId}`, user)
    return response.data
  },
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`)
    if (response.status === 204) {
      return true
    } else {
      throw new Error(`Failed to delete user with ID ${userId}`)
    }
  }
}

export default userService
