import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Chip
} from '@mui/material'

import SearchBar from '../features/book/components/SearchBar'
import { setSearch, getAllBooks, setSelectedBook } from '../features/book/slices/bookSlice'
import { getAllCategories, setSelectedCategory } from '../features/category/slices/categorySlice'

const Library = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const books = useSelector((state) => state.books.books)
  const categories = useSelector((state) => state.categories.categories)
  const selectedCategory = useSelector((state) => state.categories.selectedCategory)
  const searchInput = useSelector((state) => state.books.search)

  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(getAllCategories())
  }, [dispatch])

  const handleSearchInputChange = (event) => {
    dispatch(setSearch(event.target.value))
  }

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory({ categoryId: category }))
  }

  const handleBookClick = (book) => {
    dispatch(setSelectedBook(book))
    navigate(`/books/${book.bookId}`)
  }

  const filteredBooks =
    selectedCategory && selectedCategory.categoryId
      ? books.filter(
          (book) =>
            book.category.categoryId === selectedCategory.categoryId &&
            book.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      : books.filter((book) => book.title.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
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
            color={
              selectedCategory && selectedCategory.categoryId === category.categoryId
                ? 'primary'
                : 'secondary'
            }
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
            <Card sx={{ width: 300, height: 350, position: 'relative' }}>
              <CardMedia
                component="img"
                image={book.imageURL}
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
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
                  pb: 0,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => handleBookClick(book)}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {book.author.fullName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: book.status === 'AVAILABLE' ? '#80B98F' : '#f5f5f5',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                  {book.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Library
