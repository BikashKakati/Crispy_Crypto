import React from 'react';
import { useFetch } from '../hooks/useFetch';

import { Container, Typography } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';

const Carousel = () => {
  const {apiData:coinsData, loading} = useFetch("markets","INR");
  const stylesFor = {
    containerBox:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      color:"#fff",
      marginTop:10,
      gap:10,
    },
    headline:{
      fontSize:{xs:30, sm:50, md:90},
      fontWeight:500,
      textTransform:"capitalize",
      textAlign:"center",
    },
    coinBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    coinName: {
      color: "#fff",
      textAlign: "center",
      fontWeight:600,
      fontSize:17,
    },
  }

  const items = coinsData?.map(coin => {
    const priceStatus = coin?.price_change_24h.toFixed(2);
    return (
        <div style={stylesFor.coinBox}>
          <img src={coin?.image} style={{ width: 100 }} />
          <span style={stylesFor.coinName}>{coin?.name}</span>
          <span style={{ color: priceStatus < 0 ?  "#fd0202": "#04be33", fontSize:15, fontWeight:800 }}>{priceStatus > 0 ? "+" + priceStatus : priceStatus}</span>
        </div>
        )
  })

  return (
    <Container sx={stylesFor.containerBox}>
      <div >
        <Typography sx={stylesFor.headline}>TRACK AND TRADE</Typography>
        <Typography variant='h1' sx={stylesFor.headline}>CRYPTO CURRENCIES</Typography>
      </div>
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
          600: {
            items: 5,
          }
        }}
        // autoPlay
        items={items}
      />

    </Container>
  )
}



export default Carousel;