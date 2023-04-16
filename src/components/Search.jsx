import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, TextField, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import Books from '../pages/Books'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')

  const books = useSelector((state) => state.books)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleFilterYearChange = (event) => {
    setFilterYear(event.target.value)
  }

  const handleFilterAuthorChange = (event) => {
    setFilterAuthor(event.target.value)
  }

  const filteredBooks = books.filter((book) => {
    if (
      (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(filterAuthor.toLowerCase())) ||
      (book.publishedYear && book.publishedYear.toString().includes(filterYear))
    ) {
      return true
    }
    return false
  })

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        id="search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'grey.500' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <FilterListIcon sx={{ color: 'grey.500' }} />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            background: 'white',
            borderRadius: 20,
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey.300'
          }
        }}
        placeholder="Search books"
      />
      <Books books={filteredBooks} />
    </Box>
  )
}

export default Search
