import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import { borrowBook, setSelectedTransaction } from '../slices/transactionSlice'
import { fetchCurrentUser, selectCurrentUser } from '../../../features/auth/slices/authSlice'

const Borrow = ({ book }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector(selectCurrentUser)
  const selectedTransaction = useSelector((state) => state.transactions.selectedTransaction)

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
      .then((action) => {
        const borrowedTransaction = action.payload
        dispatch(setSelectedTransaction(borrowedTransaction))
        setIsSnackbarOpen(true)
        setTimeout(() => {
          setIsSnackbarOpen(false)
          navigate('/my_account')
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const isBorrowed = selectedTransaction && selectedTransaction.borrowed

  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      {isBorrowed ? (
        <Button variant="contained" disabled>
          Borrowed
        </Button>
      ) : (
        <Button variant="contained" onClick={handleBorrow}>
          Borrow
        </Button>
      )}
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Book borrowed successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default Borrow
