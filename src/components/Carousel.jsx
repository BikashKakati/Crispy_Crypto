import { Card, CardActionArea, CardMedia, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';

const Carousel = () => {
  const [coinData, setCoinData] = useState([]);
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";


  const fetchApiData = async() =>{
    const {data} = await axios.get(url);
    return data;
  }
  useEffect(()=>{
    fetchApiData().then(data => setCoinData(data));
  },[])

  const item = coinData.map(coin =>(
    <img src={coin.image}/>
  ))

  return (
    <div>
      <Container>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        // autoPlay
        items={item}
        />

      </Container>
    </div>
  )
}



export default Carousel;