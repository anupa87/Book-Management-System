import { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import { Box, Snackbar, ToggleButton } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import {
  borrowBook,
  returnBook,
  getAllTransactions,
  setSelectedTransaction
} from '../slices/transactionSlice'

import { fetchCurrentUser, selectCurrentUser } from '../../auth/slices/authSlice'
import { setSelectedBook, updateBook } from '../../book/slices/bookSlice'

const Transaction = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const selectedBook = useSelector((state) => state.books.selectedBook)
  const selectedTransaction = useSelector((state) => state.transactions.selectedTransaction)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [borrowOrReturn, setBorrowOrReturn] = useState(
    localStorage.getItem('borrowOrReturn') || 'borrow'
  )
  const currentDate = moment().format('DD-MM-YYYY')

  useEffect(() => {
    dispatch(fetchCurrentUser())
    dispatch(getAllTransactions())
  }, [dispatch])

  // Function to update borrowOrReturn when book status changes
  useEffect(() => {
    if (selectedBook) {
      if (selectedBook.status === 'AVAILABLE') {
        setBorrowOrReturn('borrow')
      } else if (selectedBook.status === 'NOT_AVAILABLE') {
        setBorrowOrReturn('return')
      }
    }
  }, [selectedBook])

  const handleBorrow = () => {
    if (selectedBook.status === 'AVAILABLE') {
      const borrowData = {
        bookId: selectedBook.bookId,
        userId: currentUser.userId,
        borrowedDate: currentDate
      }
      dispatch(borrowBook(borrowData))
        .then(() => {
          setSnackbarMessage('Book borrowed sucessfully')
          setIsSnackbarOpen(true)
          setBorrowOrReturn('return')
        })
        .catch((error) => {
          setSnackbarMessage('Failed to borrow book. Please try again')
          setIsSnackbarOpen(true)
        })
    } else {
      setBorrowOrReturn('message')
    }
  }
  const handleReturn = () => {
    if (!selectedTransaction) {
      console.error('No transaction selected for return')
      return
    }

    if (selectedBook.status === 'NOT_AVAILABLE') {
      const returnData = {
        transactionId: selectedTransaction.transactionId,
        returnedDate: currentDate
      }

      dispatch(returnBook(returnData))
        .then(() => {
          setSnackbarMessage('Book returned successfully')
          setIsSnackbarOpen(true)
          setBorrowOrReturn('borrow')
        })
        .catch((error) => {
          setSnackbarMessage('Failed to return book. Please try again.')
          setIsSnackbarOpen(true)
        })
    }
  }

  const renderMessage = () => {
    if (borrowOrReturn === 'message') {
      return <div>Book is not currently available to borrow.</div>
    }
    return null
  }

  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      {borrowOrReturn === 'borrow' && (
        <ToggleButton
          color="primary"
          value="borrow"
          disabled={!(selectedBook.status === 'AVAILABLE')}
          onClick={handleBorrow}>
          Borrow
        </ToggleButton>
      )}
      {borrowOrReturn === 'return' && (
        <ToggleButton
          color="secondary"
          value="return"
          disabled={!(selectedBook.status === 'NOT_AVAILABLE')}
          onClick={handleReturn}>
          Return
        </ToggleButton>
      )}
      {borrowOrReturn === 'message' && renderMessage()}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}>
        <MuiAlert
          onClose={() => setIsSnackbarOpen(false)}
          severity={'success'}
          elevation={6}
          variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default Transaction
