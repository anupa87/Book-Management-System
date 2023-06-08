import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transactionService from '../services/transactionService'

export const borrowBook = createAsyncThunk('transactions/borrow', async (transaction) => {
  const newTransaction = await transactionService.borrowBook(transaction)
  return newTransaction
})

export const getAllTransactions = createAsyncThunk('transactions/getAllTransactions', async () => {
  const transactions = await transactionService.getAllTransactions()
  return transactions
})

export const getTransactionById = createAsyncThunk(
  'transactions/getTransactionById',
  async (transactionId) => {
    const transaction = await transactionService.getTransactionById(transactionId)
    return transaction
  }
)

export const returnBook = createAsyncThunk('transactions/returnBook', async (transactionId) => {
  try {
    await transactionService.returnBook(transactionId)
    return transactionId
  } catch (error) {
    throw new Error(`Failed to return book with ID ${transactionId}`)
  }
})

const initialState = {
  transactions: [],
  status: 'idle',
  error: null,
  selectedTransaction: null
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,

  reducers: {
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(borrowBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.transactions.push(action.payload)
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.transactions = action.payload
        console.log('getAllTransactions.fulfilled:', action.payload)
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log('getAllTransactions.rejected:', action.error.message)
      })
      .addCase(getTransactionById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedTransaction = action.payload
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(returnBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const transactionId = action.payload
        state.transactions = state.transactions.map((transaction) =>
          transaction.transactionId === transactionId
            ? { ...transaction, isBorrowed: false }
            : transaction
        )
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setSelectedTransaction } = transactionSlice.actions

export default transactionSlice.reducer
