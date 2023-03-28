import { useState } from 'react'

import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@mui/material'

const IssueBook = () => {
  const [booksIssued, setBooksIssued] = useState([])

  const handleIssueBook = () => {
    // code to handle issuing a book
  }

  return (
    <Grid item xs={10}>
      <Box sx={{ mt: 10, mb: 4, ml: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">Book Issued</Typography>
          <Button
            variant="contained"
            onClick={handleIssueBook}
            sx={{ backgroundColor: 'secondary.main' }}>
            Issue Book
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Book issue table">
            <TableHead>
              <TableRow>
                <TableCell>Book Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Borrower Name</TableCell>
                <TableCell>Borrowed Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booksIssued.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.borrowerName}</TableCell>
                  <TableCell>{book.borrowedDate}</TableCell>
                  <TableCell>{book.returnDate}</TableCell>
                  <TableCell>{book.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  )
}

export default IssueBook
