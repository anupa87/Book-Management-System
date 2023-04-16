import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Grid, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material'

const FeaturedBooks = () => {
  const books = useSelector((state) => state.books)
  const [showAllBooks, setShowAllBooks] = useState(false)

  const toggleShowAllBooks = () => {
    setShowAllBooks(!showAllBooks)
  }

  const featuredBooks = showAllBooks ? books : books.slice(0, 4)
  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h4">Featured Books</Typography>
        <Button variant="outlined" color="primary" onClick={toggleShowAllBooks}>
          {showAllBooks ? 'Show Less' : 'View All Books'}
        </Button>
      </Box>
      <hr />
      <Grid container spacing={2}>
        {featuredBooks.map((book) => (
          <Grid
            item
            key={book.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              mt: 6
            }}>
            <Card sx={{ width: 300, height: 300 }}>
              <CardMedia
                component="img"
                image={book.image}
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  height: '50%'
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FeaturedBooks
