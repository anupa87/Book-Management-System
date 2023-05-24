import api from '../../../api/api'

const authorService = {
  getAllAuthors: async () => {
    try {
      const response = await api.get('/authors')
      console.log('Author API response: ', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch authors')
    }
  },

  getAuthorById: async () => {
    try {
      const response = await api.get(`/authors/${authorId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch author with ID ${authorId}`)
    }
  },

  addAuthor: async (author) => {
    try {
      const response = await api.post('/authors', author)
      return response.data
    } catch (error) {
      throw new Error('Failed to add author')
    }
  },

  updateAuthor: async (authorId, author) => {
    try {
      const response = await api.put(`/authors/${authorId}`, author)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update author with ID ${authorId}`)
    }
  },

  deleteAuthor: async (authorId) => {
    try {
      const response = await api.delete(`/authors/${authorId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete author with ID ${authorId}`)
    }
  }
}
export default authorService
