import api from '../../../api/api'

const borrowService = {
  getAllBorrows: async () => {
    try {
      const response = await api.get('/borrows')
      console.log('Borrow API response: ', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch borrows')
    }
  },

  getBorrowById: async (borrowId) => {
    try {
      const response = await api.get(`/borrow/${borrowId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch borrow with ID ${borrowId}`)
    }
  },

  borrowBook: async (bookId, userId) => {
    try {
      const response = await api.post('/borrow', { bookId, userId })
      return response.data
    } catch (error) {
      throw new Error(`Failed to borrow book: ${error.message}`)
    }
  },

  returnBook: async (borrowId) => {
    try {
      const response = await api.post('/return', { borrowId })
      return response.data
    } catch (error) {
      throw new Error(`Failed to return book: ${error.message}`)
    }
  }
}

export default borrowService
