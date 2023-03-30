import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

import { issueBook } from '../../features/books/bookSlice'
import IssueForm from '../forms/IssueForm'

const IssuedBooks = () => {
  const books = useSelector((state) => state.books.books)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleIssue = (data) => {
    dispatch(issueBook(data))
    setOpen(false)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Book Issued</Typography>
        <Button variant="contained" sx={{ backgroundColor: 'secondary.main' }} onClick={handleOpen}>
          Issue Book
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Borrower Name</TableCell>
            <TableCell>Borrow Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books
            .filter((book) => ['borrowed', 'overdue'].includes(book.status))
            .map((issuedBook) => (
              <TableRow key={issuedBook.id}>
                <TableCell>{issuedBook.title}</TableCell>
                <TableCell>{issuedBook.borrowerName}</TableCell>
                <TableCell>{new Date(issuedBook.borrowDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(issuedBook.returnDate).toLocaleDateString()}</TableCell>
                <TableCell
                  sx={issuedBook && issuedBook.status === 'Overdue' ? { color: 'red' } : null}>
                  {issuedBook && issuedBook.status}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box>
        <IssueForm open={open} handleClose={handleClose} books={books} handleIssue={handleIssue} />
      </Box>
    </Box>
  )
}

export default IssuedBooks
