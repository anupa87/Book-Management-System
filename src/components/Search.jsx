import { useState } from 'react'
import { Box, TextField, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
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
    </Box>
  )
}

export default Search
