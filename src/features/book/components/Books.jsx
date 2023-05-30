import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Container,
  CircularProgress,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Snackbar
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MuiAlert from '@mui/material/Alert'

import { getAllBooks, deleteBook, setSelectedBook } from '../slices/bookSlice'
import UpdateBook from './UpdateBook'

const Books = () => {
  const dispatch = useDispatch()

  const books = useSelector((state) => state.books.books)
  const status = useSelector((state) => state.books.status)
  const error = useSelector((state) => state.books.error)
  const selectedBook = useSelector((state) => state.books.selectedBook)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [openBookModal, setOpenBookModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllBooks())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'failed') {
    return (
      <Typography variant="body1" color="error">
        Error: {error}
      </Typography>
    )
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage)
  const displayedBooks = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleEdit = (book) => {
    setOpenBookModal(true)
    dispatch(setSelectedBook(book))
  }

  const handleDelete = (bookId) => {
    dispatch(setSelectedBook({ bookId }))
    setIsConfirmationOpen(true)
  }

  const handleConfirmDelete = () => {
    dispatch(deleteBook(selectedBook.bookId))
      .then(() => {
        setIsConfirmationOpen(false)
        setSnackbarMessage('Book deleted successfully')
        setIsSnackbarOpen(true)
        dispatch(getAllBooks())
      })
      .catch((error) => {
        setIsConfirmationOpen(false)
        setSnackbarMessage(`Error: ${error.message}`)
        setIsSnackbarOpen(true)
      })
  }

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false)
  }

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h4">Books</Typography>
      </Box>
      <hr />
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Book table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Title</TableCell>
                <TableCell sx={{ color: 'white' }}>Category</TableCell>
                <TableCell sx={{ color: 'white' }}>Author</TableCell>
                <TableCell sx={{ color: 'white' }}>Publisher</TableCell>
                <TableCell sx={{ color: 'white' }}>Published Year</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedBooks.map((book) => (
                <TableRow key={book.bookId}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.category.name}</TableCell>
                  <TableCell>{book.author.fullName}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(book)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(book.bookId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={isConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this book?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openBookModal}
        onClose={() => setOpenBookModal(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <UpdateBook
          openBookModal={openBookModal}
          onClose={() => setOpenBookModal(false)}
          selectedBook={selectedBook}
          setOpenBookModal={setOpenBookModal}
        />
      </Dialog>

      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={status === 'succeeded' ? 'success' : 'error'}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Books
