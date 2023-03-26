import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#254670' // Customize primary color
    },
    secondary: {
      main: '#70334E' // Customize secondary color
    }
  },
  typography: {
    fontFamily: [
      'Raleway', // Set default font
      'sans-serif'
    ].join(',')
  }
  // Add more theme options here
})

export default theme
