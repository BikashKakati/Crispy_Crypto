import React from 'react';
import { useFetch } from '../hooks/useFetch';

import { Box, Container, Typography } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import Loader from './Loader';
import { ContextCryptoState } from '../context/CryptoContext';
import { useNavigate } from 'react-router-dom';

const stylesFor = {
  containerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { xs: 5, md: 6 },
  },
  headline: {
    fontSize: { xs: 28, sm: 50, md: 90 },
    fontWeight: 500,
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    textAlign: "center",
    lineHeight: 1.2,
  },
  headlineDiff:{
    WebkitBackgroundClip:"text",
    backgroundImage: "linear-gradient(25deg,#2600fc,#ff00ea)",
    color: "transparent",
  },
  coinBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: .5,
  },
  coinImage: {
    width: { xs: 70, sm: 85 },
  },
  coinName: {
    color: "var(--ori-white)",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 17,
  },
}

const Carousel = () => {
  const {currency} = ContextCryptoState();
  const { apiData: coinsData, loading } = useFetch("markets", currency,10);
  const Navigate = useNavigate();
  

  const items = coinsData?.map(coin => {
    const priceStatus = coin?.price_change_24h > 0;
    return (
        <Box sx={stylesFor.coinBox} onClick={()=>Navigate(`/details/${coin?.id}`)}>
          <Box sx={stylesFor.coinImage}><img src={coin?.image} style={{ width: "100%" }} /></Box>
          <span style={stylesFor.coinName}>{coin?.name}</span>
          <span style={{ color: priceStatus ?  "var(--ori-green)": "var(--ori-red)", fontSize: 18, fontWeight: 800 }}>{priceStatus && "+"}{coin?.price_change_24h.toFixed(2)}%</span>
        </Box>

    )
  })

  return (
    <Box sx={{background:"linear-gradient(0deg,#0f051d 30%,#130749 70%)", paddingTop:10}}>
    <Container sx={stylesFor.containerBox}>
      <Box >
        <Typography sx={stylesFor.headline}>TRACK AND TRADE</Typography>
        <Typography sx={stylesFor.headline}><span style={stylesFor.headlineDiff}>CRYPTO CURRENCIES</span></Typography>
      </Box>
      {
        loading ?
        (<Loader/>)
        :
        (
          <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={{
            0: {
              items: 2,
            },
            400: {
              items: 3,
            },
            600: {
              items: 5,
            }
          }}
          autoPlay
          items={items}
        />
        )
      }

    </Container>
    </Box>
  )
}



export default Carousel;