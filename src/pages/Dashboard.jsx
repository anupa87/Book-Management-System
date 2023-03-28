import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { Grid, Box, Typography } from '@mui/material'

import IssueBook from '../components/admin/IssueBook'
import CardsDashboard from '../components/cards/CardsDashboard'

const Dashboard = () => {
  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')
  const userName = 'Anupa'

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
          Welcome, {userName}
        </Typography>
        <CardsDashboard />
        <IssueBook />
      </Box>
    </Grid>
  )
}

export default Dashboard
