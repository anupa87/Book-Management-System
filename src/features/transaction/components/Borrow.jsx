import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import { borrowBook } from '../slices/transactionSlice'
import { fetchCurrentUser, selectCurrentUser } from '../../../features/auth/slices/authSlice'

const Borrow = ({ book }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector(selectCurrentUser)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  const handleBorrow = () => {
    const borrowedDate = new Date().toISOString()
    const transactionData = {
      bookId: book.bookId,
      userId: currentUser.userId,
      borrowedDate: borrowedDate
    }
    dispatch(borrowBook(transactionData))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
      navigate('/my_account')
    }, 3000)
  }

  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      <Button variant="contained" onClick={handleBorrow}>
        Borrow
      </Button>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Book borrowed successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default Borrow
