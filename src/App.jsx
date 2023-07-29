import Navbar from './components/Navbar'
import Home from './pages/Home'

import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'

function App() {
  const darkTheme = createTheme({
    palette:{
      primary:{
        main: "#fff",
      },
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
