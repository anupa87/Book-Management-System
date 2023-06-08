import api from '../../../api/api'

const bookService = {
  getAllBooks: async () => {
    try {
      const response = await api.get('/books')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch books')
    }
  },

  getBookById: async (bookId) => {
    try {
      const response = await api.get(`/books/${bookId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch book with ID ${bookId}`)
    }
  },

  addBook: async (book) => {
    try {
      const response = await api.post('/books', book)
      return response.data
    } catch (error) {
      throw new Error('Failed to add book')
    }
  },

  updateBook: async (bookId, book) => {
    try {
      const response = await api.put(`/books/${bookId}`, book)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update book with ID ${bookId}`)
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await api.delete(`/books/${bookId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete book with ID ${bookId}`)
    }
  }
}

export default bookService
