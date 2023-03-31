import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { issueBook } from '../../features/books/bookSlice'

const IssueForm = ({ open, handleClose, books }) => {
  const [selectedBook, setSelectedBook] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const users = useSelector((state) => state.users.users)
  const dispatch = useDispatch()

  const handleBookChange = (event) => {
    console.log(event.target.value)
    setSelectedBook(event.target.value)
  }

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value)
  }

  const handleSubmit = () => {
    console.log(selectedBook, selectedUser)
    dispatch(issueBook({ bookId: selectedBook, borrowerId: selectedUser }))
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
                {books
                  .filter((user) => user?.id)
                  .filter((book) => ['available'].includes(book.status))
                  .map((book) => (
                    <MenuItem key={uuidv4()} value={book.id}>
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
                {users
                  .filter((user) => user?.id)
                  .map((user) => (
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

export default IssueForm
