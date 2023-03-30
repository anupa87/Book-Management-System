import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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

const Homepage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allBooks = useSelector((state) => state.books.books)
  const allUsers = useSelector((state) => state.users.users)
  console.log({ allBooks })
  console.log({ allUsers })

  const borrowedBooks = loggedUser.id === borrowedBooks.borrower.id

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
          {/* Welcome, {loggedUser.firstName} {loggedUser.lastName} */}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="User table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Book Title</TableCell>
                <TableCell sx={{ color: 'white' }}>Borrowed Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Return Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Renew</TableCell>
                <TableCell sx={{ color: 'white' }}>Return</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowedBooks &&
                borrowedBooks.map((book) => (
                  <TableRow key={borrowedBooks.id}>
                    <TableCell>{borrowedBooks.title}</TableCell>
                    <TableCell>{borrowedBooks.borrowedDate}</TableCell>
                    <TableCell>{borrowedBooks.returnDate}</TableCell>
                    <TableCell>{borrowedBooks.status}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleUpdateBook(book)}>Renew</Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDeleteBook(book.id)}>Return</Button>
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
