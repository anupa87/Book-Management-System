import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import {
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent
} from '@mui/material'

import SearchBar from '../components/SearchBar'
import { search } from '../features/books/bookSlice'

const Books = () => {
  const books = useSelector((state) => state.books.books)
  const searchInput = useSelector((state) => state.books.search)

  const dispatch = useDispatch()

  const handleSearchInputChange = (event) => {
    dispatch(search(event.target.value))
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h4">Books</Typography>
      </Box>
      <hr />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '50%' }}>
          <SearchBar onChange={handleSearchInputChange} />
        </Box>
      </Box>
      <Grid container spacing={2}>
        {filteredBooks.map((book) => (
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
                image={book.imageURL}
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  height: '50%'
                }}
              />
              <CardHeader title={book.title} />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {book.author}
                </Typography>
              </CardContent>
              <CardActions>
                <RouterLink to={`/book/${book.ISBN}`} sx={{ color: 'inherit' }}>
                  Learn More
                </RouterLink>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Books
