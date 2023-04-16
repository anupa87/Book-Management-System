import { useSelector } from 'react-redux'
import moment from 'moment'

import { Grid, Box, Typography } from '@mui/material'

import DashboardCards from '../components/DashboardCards'
import AllUsers from '../components/users/AllUsers'
import AllBooks from '../components/books/AllBooks'

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ my: 2 }}>
          Dashboard
        </Typography>
        <hr />
        <Typography sx={{ mt: 1 }}>
          {moment().format('MMMM Do YYYY')} | {moment().format('dddd')},{' '}
          {moment().format('h:mm:ss a')}
        </Typography>
        <Typography variant="h5" sx={{ my: 2, textAlign: 'center' }}>
          Welcome, {currentUser?.firstName}
        </Typography>
      </Box>
      <Box sx={{ mb: 10 }}>
        <DashboardCards />
      </Box>
      <Box>
        <AllUsers />
      </Box>
      <Box>
        <AllBooks />
      </Box>
    </Grid>
  )
}
export default Dashboard
