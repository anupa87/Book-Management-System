import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import { getAllTransactions, returnBook } from '../slices/transactionSlice'

const Transaction = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const transactions = useSelector((state) => state.transactions.transactions)
  const selectedTransaction = useSelector((state) => state.transactions.selectedTransaction)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const status = useSelector((state) => state.books.status)
  const error = useSelector((state) => state.books.error)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllTransactions())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'failed') {
    return (
      <Typography variant="body1" color="error">
        Error: {error}
      </Typography>
    )
  }

  const getReturnDate = (borrowedDate) => {
    const borrowed = new Date(borrowedDate)
    borrowed.setDate(borrowed.getDate() + 30)

    const returnDateString = borrowed.toISOString().split('T')[0]
    return returnDateString
  }

  const handleReturn = () => {
    const updatedTransaction = {
      ...selectedTransaction,
      returnedDate: new Date().toISOString(),
      isBorrowed: false
    }
    dispatch(returnBook({ transactionId: selectedTransaction.transactionId, updatedTransaction }))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
      navigate('/my_account')
    }, 3000)
    dispatch(getAllTransactions())
  }

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.user.userId === currentUser.userId
  )

  return (
    <TableContainer component={Paper} style={{ minHeight: 200 }}>
      {filteredTransactions.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
          <Typography variant="h5" color="secondary" align="center">
            You don't have any active transaction
          </Typography>
        </Box>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="Transaction table">
          <TableHead sx={{ backgroundColor: 'secondary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Book</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Borrowed Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Return Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.transactionId}>
                <TableCell>{transaction.book.title}</TableCell>
                <TableCell>{transaction.borrowedDate}</TableCell>
                <TableCell>{getReturnDate(transaction.borrowedDate)}</TableCell>
                <TableCell>
                  {getReturnDate(transaction.borrowedDate) < new Date().toISOString() ? (
                    <span style={{ color: 'red' }}>OVERDUE</span>
                  ) : (
                    <span style={{ color: 'green' }}>VALID</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleReturn(transaction.transactionId)}>
                    RETURN
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Book returned successfully!
        </MuiAlert>
      </Snackbar>
    </TableContainer>
  )
}

export default Transaction
