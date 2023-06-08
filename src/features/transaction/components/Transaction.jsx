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

import { getAllTransactions, setSelectedTransaction, returnBook } from '../slices/transactionSlice'

const Transaction = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const transactions = useSelector((state) => state.transactions.transactions)
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
    const returnDate = new Date(borrowed.getTime() + 30 * 24 * 60 * 60 * 1000)
    return returnDate.toLocaleDateString()
  }

  const handleReturn = (transactionId) => {
    const foundTransaction = transactions.find(
      (transaction) => transaction.transactionId === transactionId
    )
    dispatch(setSelectedTransaction(foundTransaction))
    const returnedDate = new Date().toISOString()
    dispatch(returnBook({ transactionId: foundTransaction.transactionId, returnedDate }))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
      navigate('/my_account')
    }, 3000)
    dispatch(getAllTransactions())
  }

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.user.userId === currentUser.userId && transaction.borrowed === true
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
                  {getReturnDate(transaction.borrowedDate) < new Date().toLocaleDateString() ? (
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
