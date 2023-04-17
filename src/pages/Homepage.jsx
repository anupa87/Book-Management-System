import { useSelector } from 'react-redux'
import moment from 'moment'

import { Box, Typography } from '@mui/material'
import BorrowedBooks from '../components/users/BorrowedBooks'

const HomePage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  return (
    <>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          My Books
        </Typography>
        <hr />
        <Typography sx={{ mt: 1 }}>
          {moment().format('MMMM DD YYYY')} | {moment().format('dddd')},{' '}
          {moment().format('h:mm:ss a')}
        </Typography>
        <Typography variant="h5" sx={{ mt: 5, textAlign: 'center' }}>
          Welcome, {currentUser?.firstName}
        </Typography>
      </Box>
      <Box>
        <BorrowedBooks />
      </Box>
    </>
  )
}

export default HomePage
