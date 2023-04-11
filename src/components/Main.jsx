import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'

import theme from '../theme'

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  )
}

export default Main
