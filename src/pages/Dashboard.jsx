import { useSelector } from 'react-redux'
import moment from 'moment'

import { Grid, Box, Typography } from '@mui/material'

import Cards from '../components/Cards'
import Users from '../features/user/components/Users'
import Authors from '../features/author/components/Authors'
import Categories from '../features/category/components/Categories'
import Books from '../features/book/components/Books'

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)
  console.log(currentUser)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  return (
    <Grid>
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
        Welcome
      </Typography>
      <Box sx={{ mb: 10 }}>
        <Cards />
      </Box>
      <Box>
        <Users />
        <Authors />
        <Categories />
        <Books />
      </Box>
    </Grid>
  )
}
export default Dashboard
