import { useState } from 'react'
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material'

const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Submit form data to server or display it
  }

  return (
    <Grid container item xs={10} spacing={2}>
      <Grid item xs={10}>
        <Box>
          <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
            Contact Us
          </Typography>
          <hr />
        </Box>
      </Grid>
      <Grid item xs={10} md={6}>
        <Box>
          <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
            Our address
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Address:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Ladugatan 18B
            <br />
            70226, Heslinki, Finland
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Phone: (358) 456-7890
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Email: info@booksphere.fi
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={10} md={6}>
        <Box>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Questions or feedback?
          </Typography>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField label="Name" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Message" fullWidth margin="normal" multiline rows={4} />
            <Button variant="contained" sx={{ backgroundColor: 'secondary.main', mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Help
