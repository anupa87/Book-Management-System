import React, { useState } from 'react'

import { Box, Button, Card, CardContent, CardHeader, Grid, Typography, Modal } from '@mui/material'

import UserAddModal from '../../src/components/modals/UserAddModal'

const Dashboard = (props) => {
  const currentDate = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })
  const currentTime = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' })
  const userName = 'Anupa'

  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleRegisterUser = () => {
    handleModalOpen()
  }

  return (
    <Grid item xs={8}>
      <Box>
        <Typography variant="h3">Dashboard</Typography>
        <hr />
        <Typography>
          {currentDate} | {dayOfWeek}, {currentTime}
        </Typography>
        <Typography>Welcome, {userName}</Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Total Users" />
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  100
                </Typography>
              </CardContent>
            </Card>
            <Button variant="contained" color="primary" fullWidth onClick={handleRegisterUser}>
              Add User
            </Button>
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': {
                  width: '100%'
                }
              }}>
              <UserAddModal closeModal={handleModalClose} />
            </Modal>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Borrowed Books" />
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  10
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Overdue Books" />
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  2
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Total Members" />
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  50
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" color="primary" fullWidth>
              Add Book
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" color="primary" fullWidth>
              Add Author
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" color="primary" fullWidth>
              Issue Book
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default Dashboard
