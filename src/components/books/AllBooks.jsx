import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBook } from '../../features/books/bookSlice'
import { Link as RouterLink } from 'react-router-dom'

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Container
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'

const AllBooks = () => {
  const books = useSelector((state) => state.books)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const dispatch = useDispatch()

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDeleteBook = (bookISBN) => {
    dispatch(deleteBook(bookISBN))
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 2000)
  }

  const displayedBooks = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
                <TableCell sx={{ color: 'white' }}>Image URL</TableCell>
                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                <TableCell sx={{ color: 'white' }}>Author</TableCell>
                <TableCell sx={{ color: 'white' }}>Publisher</TableCell>
                <TableCell sx={{ color: 'white' }}>Published Year</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedBooks.map((book) => (
                <TableRow key={book.ISBN}>
                  <TableCell component="th" scope="row">
                    <RouterLink to={`/books/${book.ISBN}`} sx={{ color: 'inherit' }}>
                      {`${book.title}`}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{book.imageURL}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteBook(book.ISBN)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  {showSuccessMessage && (
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                      <Snackbar
                        open={showSuccessMessage}
                        message="Book deleted successfully"
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      />
                    </Box>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Container>
  )
}

export default AllBooks
