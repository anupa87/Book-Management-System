// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { Box, Snackbar } from '@mui/material'
// import MuiAlert from '@mui/material/Alert'

// import { returnBook } from '../slices/transactionSlice'

// const Return = ({ selectedTransaction }) => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

//   const handleReturn = () => {
//     const returnedDate = new Date().toISOString()
//     const updatedTransaction = { ...selectedTransaction, borrowed: false, returnedDate }
//     dispatch(
//       returnBook({
//         transactionId: selectedTransaction.transactionId,
//         updatedTransaction
//       })
//     )
//     setIsSnackbarOpen(true)
//     setTimeout(() => {
//       setIsSnackbarOpen(false)
//       navigate('/my_account')
//     }, 3000)
//   }
//   return (
//     <Box mt={2} display="flex" justifyContent="flex-end">
//       <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
//         <MuiAlert elevation={6} variant="filled" severity="success">
//           Book returned successfully!
//         </MuiAlert>
//       </Snackbar>
//     </Box>
//   )
// }

// export default Return
