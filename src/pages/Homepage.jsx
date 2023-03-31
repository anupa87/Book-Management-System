import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { renewBook } from '../features/books/bookSlice'
import { calculateDueDate } from '../components/helper'

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
  Button,
  IconButton,
  Link
} from '@mui/material'
import { useState } from 'react'

const Homepage = () => {
  const allBooks = useSelector((state) => state.books.books)

  const authUserId = useSelector((state) => state.auth.id)
  const authUser = useSelector((state) => state.auth.firstName)
  const borrowedBooks = allBooks.filter((book) => book.borrowerId === authUserId)
  const [renew, setRenew] = useState(false)
  const dispatch = useDispatch()

  const handleRenew = (book) => {
    if (book.status === 'overdue' && book.renewCount < 2) {
      const renewCount = book.renewCount + 1
      const dueDate = calculateDueDate(renewCount)
      const status = renewCount === 2 ? 'available' : 'borrowed'
      const updatedBook = {
        ...book,
        status,
        renewCount,
        dueDate
      }
      dispatch(renewBook(updatedBook))
    }
  }

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Homepage
        </Typography>
        <hr />
      </Box>
      <Box>
        <Typography variant="h5" sx={{ mt: 5, textAlign: 'center' }}>
          Welcome, {authUser.firstName}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="User table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Book Title</TableCell>

                <TableCell sx={{ color: 'white' }}>Return Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Renew</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowedBooks &&
                borrowedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>

                    <TableCell>{book.returnDate}</TableCell>
                    <TableCell>{book.status}</TableCell>
                    <TableCell>
                      <Button
                        disabled={book.status !== 'overdue' || book.renewCount === 2}
                        onClick={() => handleRenew(book)}>
                        Renew
                      </Button>
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

export default Homepage
