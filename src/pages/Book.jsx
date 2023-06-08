import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box, Grid, Typography, Card, CardMedia, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

import Borrow from '../features/transaction/components/Borrow'

const Book = () => {
  const navigate = useNavigate()

  const selectedBook = useSelector((state) => state.books.selectedBook)

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          mb: 2
        }}>
        <Typography variant="h4">{selectedBook.title}</Typography>
      </Box>
      <hr />
      <Grid container spacing={10} sx={{ mt: 1, justifyContent: 'center' }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              image={selectedBook.imageURL}
              alt={selectedBook.title}
              sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </Card>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Author: {selectedBook.author.fullName}
          </Typography>
          <Typography variant="subtitle1">Published Year: {selectedBook.publishedYear}</Typography>
          <Typography variant="subtitle1">Publisher: {selectedBook.publisher}</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Synopsis
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {selectedBook.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 8, fontSize: 'bold' }}>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          color="secondary"
          sx={{ height: '50px', fontWeight: 'bold', fontSize: '16px' }}
          onClick={() => {
            navigate('/books')
          }}>
          Back to Library
        </Button>
        <Box>
          <Borrow book={selectedBook} />
        </Box>
      </Box>
    </Box>
  )
}

export default Book
