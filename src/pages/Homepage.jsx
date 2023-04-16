import { useSelector } from 'react-redux'
import moment from 'moment'

import { Box, Typography } from '@mui/material'

import Events from '../components/events/Events'
import FeaturedBooks from '../components/books/FeaturedBooks'
import FeaturedPopular from '../components/books/FeaturedPopular'

const HomePage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)
  console.log(currentUser)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  return (
    <>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          BookSphere
        </Typography>
        <hr />
        <Typography sx={{ mt: 1 }}>
          {moment().format('MMMM Do YYYY')} | {moment().format('dddd')},{' '}
          {moment().format('h:mm:ss a')}
        </Typography>
        <Typography variant="h5" sx={{ mt: 5, textAlign: 'center' }}>
          Welcome, {currentUser?.firstName}
        </Typography>
      </Box>
      <Box>
        <FeaturedBooks />
      </Box>
      <Box>
        <FeaturedPopular />
      </Box>
      <Box>
        <Events />
      </Box>
    </>
  )
}

export default HomePage
