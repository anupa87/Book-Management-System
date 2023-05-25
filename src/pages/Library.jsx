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
  CardContent,
  Chip
} from '@mui/material'

import SearchBar from '../features/book/components/SearchBar'
import { setSearch, getAllBooks } from '../features/book/slices/bookSlice'
import { getAllCategories, setSelectedCategory } from '../features/category/slices/categorySlice'
import { Category } from '@mui/icons-material'

const Library = () => {
  const dispatch = useDispatch()

  const books = useSelector((state) => state.books.books)
  const searchInput = useSelector((state) => state.books.search)
  const categories = useSelector((state) => state.categories.categories)
  const selectedCategory = useSelector((state) => state.categories.selectedCategory)

  useEffect(() => {
    dispatch(getAllBooks())
  }, [dispatch])

  const handleSearchInputChange = (event) => {
    dispatch(setSearch(event.target.value))
  }

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory({ categoryId: category }))
  }
  console.log(books)
  const filteredBooks = selectedCategory
    ? books.filter(
        (book) =>
          book.category.categoryId === selectedCategory &&
          book.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : books.filter((book) => book.title.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <Box sx={{ mb: 4 }}>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 10,
          gap: 6
        }}>
        <Chip
          label="All"
          clickable
          color={selectedCategory === null ? 'primary' : 'secondary'}
          onClick={() => handleCategorySelect(null)}
          sx={{ minWidth: '100px' }}
        />
        {categories.map((category) => (
          <Chip
            key={category.categoryId}
            label={category.name}
            clickable
            color={selectedCategory === category.categoryId ? 'primary' : 'secondary'}
            onClick={() => handleCategorySelect(category.categoryId)}
            sx={{ minWidth: '100px' }}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {filteredBooks.map((book) => (
          <Grid
            item
            key={book.bookId}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{
              mt: 6
            }}>
            <Card sx={{ width: 300, height: 350 }}>
              <CardMedia
                component="img"
                image={book.imageURL}
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  height: '60%'
                }}
              />
              <CardHeader
                title={book.title}
                sx={{
                  textDecoration: 'none',
                  '& .MuiCardHeader-title': {
                    fontSize: '1.2rem',
                    fontWeight: 'semi-bold',
                    color: '#000000',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  },
                  pb: 0
                }}
                component={RouterLink}
                to={`/books/${book.bookId}`}
              />
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
