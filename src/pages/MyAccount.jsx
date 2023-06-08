import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Typography, Box, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

import Transaction from '../features/transaction/components/Transaction'
import PersonalInformation from '../features/user/components/PersonalInformation'

const MyAccount = () => {
  const navigate = useNavigate()

  const [showTransactions, setShowTransactions] = useState(true)

  const toggleComponent = () => {
    setShowTransactions(!showTransactions)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          My Account
        </Typography>
      </Box>
      <hr />
      <Box sx={{ mt: 10, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" gutterBottom>
          {showTransactions ? 'Transactions' : 'Personal Information'}
        </Typography>
        <Button
          variant="contained"
          onClick={toggleComponent}
          sx={{
            fontWeight: 'bold',
            height: '50px'
          }}>
          {showTransactions ? 'Personal Information' : 'Transactions'}
        </Button>
      </Box>
      <Box>{showTransactions ? <Transaction /> : <PersonalInformation />}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 8, fontSize: 'bold' }}>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          color="secondary"
          sx={{ height: '50px', fontWeight: 'bold', fontSize: '16px' }}
          onClick={() => {
            navigate('/books')
          }}>
          Back to Library
        </Button>
      </Box>
    </Box>
  )
}

export default MyAccount
