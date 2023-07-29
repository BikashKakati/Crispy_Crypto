import { Container, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'

const CoinTable = () => {
  const stylesFor = {
    coinTableContainer:{
      textAlign:"center",
      marginTop:15,
    },
    headLine:{
      fontSize: 35,
      fontWeight: 700,
    },
    searchBar:{
      width:"100%",
      marginTop:3,
      marginBottom:3,
    }
  }
  return (
    <Container sx={stylesFor.coinTableContainer}>
      <Typography sx={stylesFor.headLine}> 
        Cryptocurrency Prices By Market Cap
      </Typography>
      <TextField
      label="Search Coins.."
      variant="outlined"
      sx={stylesFor.searchBar}
      />
      <TableContainer>
        <Table>
          <TableHead sx={{background:"gold"}}>
            <TableRow>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(
                <TableCell
                sx={{ color:"#000",}}
                key={head}
                align ={head === "Coin" ?"":"right"}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default CoinTable