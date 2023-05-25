import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import borrowService from '../../borrow/services/borrowService'

export const getAllBorrows = createAsyncThunk('borrows/getAllBorrows', async () => {
  const borrows = await borrowService.getAllBorrows()
  console.log(borrows)
  return borrows
})

export const getBorrowById = createAsyncThunk('borrows/getBorrowById', async (borrowId) => {
  const borrow = await borrowService.getBorrowById(borrowId)
  return borrow
})

export const borrowBook = createAsyncThunk('borrows/borrowBook', async ({ bookId, userId }) => {
  try {
    const newBorrow = await borrowService.borrowBook(bookId, userId)
    return newBorrow
  } catch (error) {
    throw new Error(`Failed to borrow book: ${error.message}`)
  }
})

export const returnBook = createAsyncThunk('borrows/returnBook', async (borrowId) => {
  try {
    const returnedBorrow = await borrowService.returnBook(borrowId)
    return returnedBorrow
  } catch (error) {
    throw new Error(`Failed to return book: ${error.message}`)
  }
})

const initialState = {
  borrows: [],
  status: 'idle',
  error: null,
  selectedBorrow: null,
  borrowedBorrow: null
}

const borrowSlice = createSlice({
  name: 'borrows',
  initialState,

  reducers: {
    setSelectedborrow: (state, action) => {
      state.selectedBorrow = action.payload.borrowId
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBorrows.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllBorrows.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.borrows = action.payload
        console.log('getAllBorrows.fulfilled:', action.payload)
      })
      .addCase(getAllBorrows.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log('getAllBorrows.rejected:', action.error.message)
      })
      .addCase(getBorrowById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBorrowById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedBorrow = action.payload
      })
      .addCase(getBorrowById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(borrowBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.borrows.push(action.payload)
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(returnBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const returnedBorrow = action.payload
        const index = state.borrows.findIndex((borrow) => borrow.id === returnedBorrow.id)
        if (index !== -1) {
          state.borrows[index] = returnedBorrow
        }
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setSelectedBorrow } = borrowSlice.actions

export default borrowSlice.reducer
