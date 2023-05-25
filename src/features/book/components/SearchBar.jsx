import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import { setSearch } from '../../book/slices/bookSlice'

const SearchBar = () => {
  const dispatch = useDispatch()

  const searchTerm = useSelector((state) => state.books.search)

  const handleSearch = (event) => {
    dispatch(setSearch(event.target.value))
  }

  return (
    <Box sx={{ mt: 6 }}>
      <TextField
        id="search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey.300'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
        placeholder="Search books by title..."
      />
    </Box>
  )
}

export default SearchBar
