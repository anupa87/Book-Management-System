import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Grid, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material'

const FeaturedPopular = () => {
  const books = useSelector((state) => state.books)
  const [showAllPopular, setShowAllPopular] = useState(false)

  const toggleShowAllPopular = () => {
    setShowAllPopular(!showAllPopular)
  }

  const sortedPopularBooks = [...books]
    .filter((book) => book.likesCount > 0)
    .sort((a, b) => b.likesCount - a.likesCount)
  const featuredPopular = showAllPopular ? sortedPopularBooks : sortedPopularBooks.slice(0, 4)

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h4">Popular Books</Typography>
        <Button variant="outlined" color="primary" onClick={toggleShowAllPopular}>
          {showAllPopular ? 'Show Less' : 'View All Popular'}
        </Button>
      </Box>
      <hr />
      <Grid container spacing={2}>
        {showAllPopular
          ? featuredPopular.map((book) => (
              <Grid
                item
                key={book.id}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{
                  mt: 6
                }}>
                <Card sx={{ width: 300, height: 300 }}>
                  <CardMedia
                    component="img"
                    height={150}
                    image={book.image}
                    alt={book.title}
                    sx={{
                      objectFit: 'cover',
                      width: '100%'
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
            ))
          : featuredPopular.map((book) => (
              <Grid
                item
                key={book.id}
                xs={12}
                sm={6}
                md={3}
                lg={3}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}

export default FeaturedPopular
