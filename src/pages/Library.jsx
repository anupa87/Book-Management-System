import { useEffect } from 'react'
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

import SearchBar from '../features/book/components/SearchBar'
import { setSearch, getAllBooks } from '../features/book/slices/bookSlice'

const Library = () => {
  const dispatch = useDispatch()

  const books = useSelector((state) => state.books.books)
  const searchInput = useSelector((state) => state.books.search)

  useEffect(() => {
    dispatch(getAllBooks())
  }, [dispatch])

  const handleSearchInputChange = (event) => {
    dispatch(setSearch(event.target.value))
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
            key={book.bookId}
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
                  {book.author.fullName}
                </Typography>
              </CardContent>
              <CardActions>
                <RouterLink to={`/books/${book.bookId}`} sx={{ color: 'inherit' }}>
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

export default Library
