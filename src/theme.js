import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#254670' // Customize primary color
    },
    secondary: {
      main: '#70334E' // Customize secondary color
    },
    icon: {
      main: '#FFFFF' // Customize icon color
    }
  },
  typography: {
    fontFamily: [
      'Raleway', // Set default font
      'sans-serif'
    ].join(',')
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240, // Customize drawer width
          backgroundColor: '#254670',
          color: 'white'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit' // Set icon color to inherit from parent element
        }
      }
    }
  }
})

export default theme
