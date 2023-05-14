import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, IconButton } from '@mui/material'
import { search } from '../../../features/book/slices/bookSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.books.search)

  const handleSearch = (event) => {
    dispatch(search(event.target.value))
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
        placeholder="Search books by title..."
      />
    </Box>
  )
}

export default SearchBar
