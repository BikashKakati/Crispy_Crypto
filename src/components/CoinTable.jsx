import { Box, Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'

const CoinTable = () => {
  const { apiData: coinData, loading } = useFetch("markets", "INR", 100);
  const [page, setPage] = useState(1);
  const stylesFor = {
    coinTableContainer: {
      textAlign: "center",
      marginTop: 10,
    },
    headLine: {
      fontSize: 35,
      fontWeight: 700,
    },
    searchBar: {
      width: "100%",
      marginTop: 3,
      marginBottom: 3,
    }
  }
  return (
    <Container sx={stylesFor.coinTableContainer}>
      <Typography sx={stylesFor.headLine}>
        Market Update
      </Typography>
      <TextField
        label="Search Coins.."
        variant="outlined"
        sx={stylesFor.searchBar}
      />
        <TableContainer>
      {
        loading ?
          (
            <LinearProgress sx={{background:"var(--ori-gold)"}} />
          )
          : (
              <Table>
                <TableHead sx={{ background: "var(--ori-gold)" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        sx={{ color: "var(--ori-black)", fontSize:20, fontWeight:900}}
                        key={head}
                        align={head == "Coin" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    coinData?.slice((page-1)*10,(page-1)*10+10).map(coin => {
                      const profit = coin?.price_change_percentage_24h > 0;

                      return (
                        <TableRow key={coin?.name} hover>
                          <TableCell component="th" scope='row' sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <img src={coin?.image} alt={coin?.name} style={{ height: 40 }} />
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <Typography sx={{ fontSize: 21, textTransform: "uppercase" }}>{coin?.symbol}</Typography>
                              <Typography sx={{ fontSize: 13, fontWeight: 600, color:"var(--ori-grey)" }}>{coin?.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography>
                              ${coin?.current_price?.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography sx={{ color: profit ? "var(--ori-green)" : "var(--ori-red)" }}>
                              {profit && "+"}
                              {coin?.price_change_percentage_24h.toFixed(2)}%
                            </Typography>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography>
                              {coin?.market_cap.toString().slice(0, -6)}M
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
          )
        }
        </TableContainer>
        <Pagination
        sx={{display:"flex", justifyContent:"center", marginTop:5, width:"100%"}}
        count={Math.floor(coinData?.length/10)}
        onChange={(_,value)=>{
          setPage(value);
          window.scroll(0,550);
        }}/>

    </Container>
  )
}

export default CoinTable