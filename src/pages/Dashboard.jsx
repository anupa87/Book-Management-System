import { useSelector } from 'react-redux'
import moment from 'moment'

import { Grid, Box, Typography } from '@mui/material'

import DashboardCards from '../components/DashboardCards'
import AllUsers from '../components/admin/AllUsers'
import AllBooks from '../components/books/AdminBooks'

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h3" sx={{ my: 2 }}>
          Dashboard
        </Typography>
      </Box>
      <hr />
      <Typography sx={{ mt: 1 }}>
        {moment().format('MMMM Do YYYY')} | {moment().format('dddd')},{' '}
        {moment().format('h:mm:ss a')}
      </Typography>
      <Typography variant="h5" sx={{ my: 2, textAlign: 'center' }}>
        Welcome, {currentUser?.firstName}
      </Typography>
      <Box sx={{ mb: 10 }}>
        <DashboardCards />
      </Box>
      <Box>
        <AllUsers />
      </Box>
      <Box>
        <AllBooks />
      </Box>
    </Box>
  )
}
export default Dashboard
