import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transactionService from '../services/transactionService'

export const borrowBook = createAsyncThunk('transactions/borrow', async (borrowData) => {
  const newBorrow = await transactionService.borrowBook(borrowData)
  return newBorrow
})

export const returnBook = createAsyncThunk('transactions/return', async (returnData) => {
  const newReturn = await transactionService.returnBook(returnData)
  return newReturn
})

export const getTransactionById = createAsyncThunk(
  'borrows/getTransactionById',
  async (transactionId) => {
    const transaction = await transactionService.getTransactionById(transactionId)
    return transaction
  }
)

export const getAllTransactions = createAsyncThunk('borrows/getAllTransactions', async () => {
  const transactions = await transactionService.getAllTransactions()
  return transactions
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
        const borrowedBook = action.payload
        state.selectedTransaction = borrowedBook
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(returnBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        const returnedBook = action.payload
        state.selectedTransaction = returnedBook
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.transactions = action.payload
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
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
  }
})

export const { setSelectedTransaction } = transactionSlice.actions

export default transactionSlice.reducer
