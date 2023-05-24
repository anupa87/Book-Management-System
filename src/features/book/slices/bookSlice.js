import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookService from '../../book/services/bookService'

export const getAllBooks = createAsyncThunk('books/getAllBooks', async () => {
  const books = await bookService.getAllBooks()
  console.log(books)
  return books
})

export const getBookById = createAsyncThunk('books/getBookById', async (bookId) => {
  const book = await bookService.getBookById(bookId)
  return book
})

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const newBook = await bookService.addBook(book)
  return newBook
})

export const updateBook = createAsyncThunk('books/updateBook', async ({ bookId, book }) => {
  const updateBook = await bookService.updateBook(bookId, book)
  return updateBook
})

export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId) => {
  await bookService.deleteBook(bookId)
  return bookId
})

const initialState = {
  books: [],
  status: 'idle',
  error: null,
  selectedBook: null,
  borrowedBook: null,
  issuedBook: null,
  search: ''
}

const bookSlice = createSlice({
  name: 'books',
  initialState,

  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload.bookId
    },
    setBorrowedBook: (state, action) => {
      state.borrowedBook = action.payload.bookId
    },
    setIssuedBook: (state, action) => {
      state.issuedBook = action.payload.bookId
    },
    setSearch: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = action.payload
        console.log('getAllBooks.fulfilled:', action.payload)
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log('getAllBooks.rejected:', action.error.message)
      })
      .addCase(getBookById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedBook = action.payload
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books.push(action.payload)
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedBookIndex = state.books.findIndex(
          (book) => book.bookId === action.payload.bookId
        )
        state.books[updatedBookIndex] = action.payload
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = state.books.filter((book) => book.bookId !== action.payload)
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setSelectedBook, setBorrowedBook, setIssuedBook, setSearch } = bookSlice.actions

export default bookSlice.reducer
