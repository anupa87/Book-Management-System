import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

const IssueBookForm = ({ open, handleClose, handleIssue }) => {
  const [selectedBook, setSelectedBook] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const books = useSelector((state) => state.books.books)
  const users = useSelector((state) => state.users)

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value)
  }

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value)
  }

  const handleSubmit = () => {
    handleIssue({
      ...books.find((b) => b.id === selectedBook),
      status: 'issued',
      bookId: selectedBook,
      borrowerId: selectedUser,
      borrowerName: users.find((u) => u.id === selectedUser).firstName,
      borrowDate: new Date().toISOString()
    })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
      <DialogTitle>Issue Book</DialogTitle>
      <DialogContent>
        <form style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl sx={{ minWidth: '200px' }}>
              <InputLabel id="book-label">Select Book</InputLabel>
              <Select
                labelId="book-label"
                value={selectedBook}
                onChange={handleBookChange}
                required>
                open={selectedBook}
                {books.map((book) => (
                  <MenuItem key={uuidv4()} value={book.id} disabled={book.status !== 'available'}>
                    {book.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="user-label">Select User</InputLabel>
              <Select
                labelId="user-label"
                value={selectedUser}
                onChange={handleUserChange}
                required>
                {users.map((user) => (
                  <MenuItem key={uuidv4()} value={user.id}>
                    {`${user.firstName} ${user.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Issue</Button>
      </DialogActions>
    </Dialog>
  )
}

export default IssueBookForm
