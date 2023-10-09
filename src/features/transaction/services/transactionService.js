import api from '../../../api/api'

const transactionService = {
  borrowBook: async (borrowData) => {
    try {
      const response = await api.post('/transactions/borrow', borrowData)
      const updatedBook = response.data
      return response.data
    } catch (error) {
      console.error('Error while borrowing book:', error)
      throw new Error('Failed to borrow book')
    }
  },

  returnBook: async (returnData) => {
    try {
      const { transactionId } = returnData
      const response = await api.put(`/transactions/${transactionId}/return`, returnData)
      return response.data
    } catch (error) {
      console.error('Error while returning book:', error)
      throw new Error(`Failed to return book with ID ${transactionId}`)
    }
  },

  getTransactionById: async (transactionId) => {
    try {
      const response = await api.get(`/transactions/${transactionId}`)
      console.log('Transaction API Response:', response)
    } catch (error) {
      throw new Error(`Failed to fetch transaction with ID ${transactionId}`)
    }
  },

  getAllTransactions: async () => {
    try {
      const response = await api.get('/transactions')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch transactions')
    }
  }
}

export default transactionService
