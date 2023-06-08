import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import { returnBook } from '../slices/transactionSlice'

const Return = ({ selectedTransaction }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleReturn = async () => {
    try {
      const returnedDate = new Date().toISOString()

      const transactionData = {
        transactionId: selectedTransaction.transactionId,
        bookId: selectedTransaction.bookId,
        userId: selectedTransaction.userId,
        returnedDate: returnedDate
      }

      await dispatch(returnBook(transactionData.transactionId))
      setIsSnackbarOpen(true)
      setTimeout(() => {
        setIsSnackbarOpen(false)
        navigate('/books')
      }, 3000)
    } catch (error) {
      console.error('Failed to return book:', error)
    }
  }

  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      <Button variant="contained" onClick={handleReturn}>
        Return
      </Button>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Book returned successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default Return
