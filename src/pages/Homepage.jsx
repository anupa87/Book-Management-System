import { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from '@mui/material'

import heroImage from '../../public/assests/heroImage.jpg'
import Footer from '../components/Footer'
import Events from '../components/events/Events'

const Homepage = () => {
  const allBooks = useSelector((state) => state.books)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative' }}>
          <img
            src={heroImage}
            alt="Hero Image"
            style={{ width: '100%', height: '55vh', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translate(-50%, 50%)',
              backgroundColor: '#70334E',
              textAlign: 'center',
              opacity: 1
            }}>
            <Button onClick={handleOpen}>Login</Button>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '50%',
              left: '50%',
              transform: 'translate(-50%, 50%)',
              backgroundColor: '#70334E',
              textAlign: 'center',
              padding: 2,
              opacity: 0.9
            }}>
            <Typography
              variant="h1"
              sx={{ mb: 1, fontWeight: 'bold', letterSpacing: '0.1em' }}
              color="#FFFFFF">
              BookSphere
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, underline: 'none' }}>
              <Typography variant="h6" gutterBottom color="#FFFFFF">
                Opening: Monday - Friday ( 9:00 - 16:00)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={10}>
        <Box sx={{ my: 4 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4">Featured Books</Typography>
            <Button variant="outlined" color="primary">
              View All Books
            </Button>
          </Box>
          <hr />
          <Grid container spacing={2}>
            {allBooks.map((book) => (
              <Grid
                item
                key={book.id}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  mt: 6
                }}>
                <Card sx={{ width: 300, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={book.image}
                    alt={book.title}
                    sx={{
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {book.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Events />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: '#70334E',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Footer />
      </Grid>
    </Grid>
  )
}

export default Homepage
