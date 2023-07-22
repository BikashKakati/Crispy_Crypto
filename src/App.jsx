import Navbar from './components/Navbar'
import Home from './pages/Home'

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
    <Home/>
    </>
    </ThemeProvider>
  )
}

export default App
