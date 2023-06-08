import api from '../../../api/api'

const transactionService = {
  borrowBook: async (transaction) => {
    try {
      const response = await api.post('/transactions/borrow', transaction)
      return response.data
    } catch (error) {
      throw new Error('Failed to borrow book')
    }
  },

  getAllTransactions: async () => {
    try {
      const response = await api.get('/transactions')
      console.log('Transaction API response: ', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch transactions')
    }
  },

  getTransactionById: async (transactionId) => {
    try {
      const response = await api.get(`/transactions/${transactionId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch transaction with ID ${transactionId}`)
    }
  },

  returnBook: async (transactionId) => {
    try {
      await api.put(`/transactions/${transactionId}/return`)
    } catch (error) {
      throw new Error(`Failed to return book for transaction with ID ${transactionId}`)
    }
  }
}

export default transactionService
