import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBook } from '../features/books/bookSlice'

import {
  Grid,
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
  Link
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Books = () => {
  const books = useSelector((state) => state.books.books)
  console.log(books)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUpdateBook = (book) => {
    const updateUserUrl = `/update/${book.id}`
    navigate(updateUserUrl, { state: book })
  }

  const handleDeleteBook = (bookId) => {
    dispatch(deleteBook(bookId))
  }

  const handleStatusLink = (borrowerId) => {
    navigate(`/issuedBooks/${borrowerId}`)
  }
  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          All Books
        </Typography>
        <hr />
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="User table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>ISBN</TableCell>
                <TableCell sx={{ color: 'white' }}>Title</TableCell>
                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                <TableCell sx={{ color: 'white' }}>Author</TableCell>
                <TableCell sx={{ color: 'white' }}>Publisher</TableCell>
                <TableCell sx={{ color: 'white' }}>Publish Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Update</TableCell>
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books &&
                books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell component="th" scope="row">
                      {book.ISBN}
                    </TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.authorId}</TableCell>
                    <TableCell>{book.publisher}</TableCell>
                    <TableCell>{book.publisedDate}</TableCell>
                    <TableCell>
                      <Link component="button" onClick={() => handleStatusLink(book.borrowerId)}>
                        {book.status}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdateBook(book)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteBook(book.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  )
}

export default Books
