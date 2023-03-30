import { useState } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { issueBook } from '../../features/books/bookSlice'

const IssueForm = ({ open, handleClose, books }) => {
  const [selectedBook, setSelectedBook] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const users = useSelector((state) => state.users.users)
  const dispatch = useDispatch()

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value)
  }

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const book = books.find((book) => book.id === selectedBook)
    dispatch(issueBook({ bookId: book.id, borrowerId: selectedUser }))
    handleClose(selectedBook)
  }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
      <DialogTitle>Issue Book</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                  <MenuItem key={book.id} value={book.id}>
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
                  <MenuItem key={user.id} value={user.id}>
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
        <Button type="submit" onClick={handleSubmit}>
          Issue
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default IssueForm
