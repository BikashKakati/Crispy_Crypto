import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
const CoinDetail = lazy(() => import('./pages/CoinDetail'));

import './App.css'
import { Box, CircularProgress, ThemeProvider, createTheme } from '@mui/material'

function App() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#eeeeee",
      },
      mode: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
        <Router>
          <Navbar />
          <Suspense fallback={<Box sx={{width:"100%", height:"100vh",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}><CircularProgress /></Box>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<CoinDetail />} />
            </Routes>
          </Suspense>
        </Router>

    </ThemeProvider>
  )
}

export default App
