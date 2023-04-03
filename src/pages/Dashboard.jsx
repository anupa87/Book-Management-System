import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { Grid, Box, Typography } from '@mui/material'

import IssueBook from '../components/admin/IssuedBooks'
import AddCards from '../components/admin/AddCards'

const Dashboard = () => {
  const authUserId = useSelector((state) => state.auth.id)
  const allUsers = useSelector((state) => state.users)
  const loggedUser = allUsers?.find((user) => user.id === authUserId)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Dashboard
        </Typography>
        <hr />
        <Typography sx={{ mt: 1 }}>
          {moment().format('MMMM Do YYYY')} | {moment().format('dddd')},{' '}
          {moment().format('h:mm:ss a')}
        </Typography>
        <Typography variant="h5" sx={{ mt: 5, textAlign: 'center' }}>
          Welcome, {loggedUser.firstName}
        </Typography>
        <AddCards />
        <IssueBook />
      </Box>
    </Grid>
  )
}

export default Dashboard
