import Navbar from './components/Navbar'

import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'

function App() {
  const darkTheme = createTheme({
    palette:{
      mode: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
    <>
    <Navbar/>
    </>
    </ThemeProvider>
  )
}

export default App
