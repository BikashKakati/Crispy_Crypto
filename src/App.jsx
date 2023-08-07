import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import CoinDetail from './pages/CoinDetail';

function App() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<CoinDetail/>} />
          </Routes>
        </Router>

      </>
    </ThemeProvider>
  )
}

export default App
