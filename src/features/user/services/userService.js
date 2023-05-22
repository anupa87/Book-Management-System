import api from '../../../api/api'

const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get('/users')
      console.log('API response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch users')
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch user with ID ${userId}`)
    }
  },

  addUser: async (user) => {
    try {
      const response = await api.post('/users', user)
      return response.data
    } catch (error) {
      throw new Error('Failed to add user')
    }
  },

  updateUser: async (userId, user) => {
    try {
      const response = await api.put(`/users/${userId}`, user)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update user with ID ${userId}`)
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`)
      if (response.status === 204) {
        return true
      } else {
        throw new Error(`Failed to delete user with ID ${userId}`)
      }
    } catch (error) {
      throw new Error(`Failed to delete user with ID ${userId}`)
    }
  }
}

export default userService
