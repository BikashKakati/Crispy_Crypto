import React from 'react';
import { useFetch } from '../hooks/useFetch';

import { Box, Container, Typography } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import Loader from './Loader';

const Carousel = () => {
  const { apiData: coinsData, loading } = useFetch("markets", "INR");
  
  const stylesFor = {
    containerBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
      marginTop: 10,
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
      color: "#fff",
      textAlign: "center",
      fontWeight: 600,
      fontSize: 17,
    },
  }

  const items = coinsData?.map(coin => {
    const priceStatus = coin?.price_change_24h.toFixed(2);
    return (
        <Box sx={stylesFor.coinBox}>
          <Box sx={stylesFor.coinImage}><img src={coin?.image} style={{ width: "100%" }} /></Box>
          <span style={stylesFor.coinName}>{coin?.name}</span>
          <span style={{ color: priceStatus < 0 ? "#fd0202" : "#04be33", fontSize: 20, fontWeight: 800 }}>{priceStatus > 0 ? "+" + priceStatus : priceStatus}</span>
        </Box>

    )
  })

  return (
    <Container sx={stylesFor.containerBox}>
      <Box >
        <Typography sx={stylesFor.headline}>TRACK AND TRADE</Typography>
        <Typography sx={stylesFor.headline}>CRYPTO CURRENCIES</Typography>
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
          // autoPlay
          items={items}
        />
        )
      }

    </Container>
  )
}



export default Carousel;