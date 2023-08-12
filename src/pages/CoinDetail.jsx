import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import parse from "html-react-parser";

const CoinDetail = () => {
  const { id: coinId } = useParams();
  const { apiData: coinDetails, loading } = useFetch(coinId);
  console.log(coinDetails);
  const profit = coinDetails?.market_data?.price_change_24h > 0;
  return (
    <Container sx={{ display: "flex", margin: "25px auto", alignItems:"center", justifyContent:"center"}}>
      {
        loading ?
          (<CircularProgress />)
          :
          (
            <>
              <Box sx={{ maxWidth: 400, borderRight: "1px solid var(--ori-grey)", display: "flex", flexDirection: "column", alignItems: "center",padding:"20px 15px 20px 0"  }}>
                <Box sx={{ height: 140, width: 140, marginBottom: 2 }}>
                  <img style={{ height: "100%", width: "100%" }} src={coinDetails?.image?.large} />
                </Box>
                <Box>
                  <Typography sx={{ textAlign: "center", fontSize: 30, fontWeight: 700 }}>
                    {coinDetails?.name}
                  </Typography>
                  <Typography sx={{ textAlign: "center", fontSize: 20, fontWeight: 500, marginBottom: 1 }}>
                    Rank: #{coinDetails?.market_cap_rank}
                  </Typography>
                  <Typography sx={{ marginBottom: 1 }}>
                    {parse(`${coinDetails?.description?.en.split(". ")[0]}.${coinDetails?.description?.en.split(". ")[1]}.`)}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    <span style={{ fontSize: 20, fontWeight: 400, color: "var(--ori-gold)" }}>Current Price:  </span>{coinDetails?.market_data?.current_price?.inr}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    <span style={{ fontSize: 20, fontWeight: 400, color: "var(--ori-gold)" }}>Market Cap:  </span>{coinDetails?.market_data?.market_cap?.inr?.toString().slice(0, -6)}M
                  </Typography>
                  <Typography sx={{ color: profit ? "var(--ori-green)" : "var(--ori-red)", fontWeight: 600 }}>
                    <span style={{ fontSize: 20, fontWeight: 400, color: "var(--ori-gold)" }}>24h Change:  </span>{!!profit && " + " }{coinDetails?.market_data?.price_change_24h}
                  </Typography>
                </Box>
              </Box>
              <Box>

              </Box>
            </>
          )
      }
    </Container>
  )
}

export default CoinDetail