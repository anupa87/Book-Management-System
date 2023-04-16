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

import { updateBook } from '../../features/books/bookSlice'
import IssueForm from './IssueBookForm'
import { v4 as uuidv4 } from 'uuid'

const filterBooks = (tmpBooks) =>
  tmpBooks?.filter((book) => ['borrowed', 'overdue', 'issued'].includes(book.status))

const IssuedBooks = () => {
  const books = useSelector((state) => state.books)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleIssue = (data) => {
    dispatch(updateBook(data))
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
          {filterBooks(books).map((issuedBook) => (
            <TableRow key={uuidv4()}>
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
