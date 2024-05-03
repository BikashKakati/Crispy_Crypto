
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Box, Button, Container, LinearProgress, Typography } from '@mui/material';
import parse from "html-react-parser";
import CoinChart from '../components/CoinChart';
import { ContextCryptoState } from '../context/CryptoContext';
import { chartDays } from '../utils/data';

const stylesFor = {
  mainContainer: {
    display: "flex",
    alignItems: "center",
    margin: " 0px auto",
    justifyContent: "center",
    gap: 5,
    flexWrap:{xs:"wrap",md:"nowrap"},
  },
  coinDetailsBox: {
    maxWidth: {xs:"95%",sm:"80%",md:350,},
    margin:"auto",
    display:"flex",
    borderRight: {sm:"notset", md:"1px solid var(--ori-grey)"},
    flexDirection: "column",
    alignItems: "center",
    padding: {xs:"notset",md:"20px 15px 20px 0"},
  },
  marketDetailsTitle: {
    fontSize: 20,
    fontWeight: 400,
    color: "var(--ori-blue)",
  },
  chartContainer:{
    width:{xs:"100%",md:600,lg:850},
    display: "flex", 
    flexDirection: "column", 
    gap: 4, 
    alignItems: "center", 
    justifyContent:"center",
  }

}

const CoinDetail = () => {
  const { id: coinId } = useParams();
  const { apiData: coinDetails, loading } = useFetch(coinId);
  const [days, setDays] = useState(1);
  const { symbol, currency } = ContextCryptoState();

  useEffect(()=>{
    window.scroll(0,0)
  },[])
  
  const positiveChange = coinDetails?.market_data?.price_change_24h > 0;
  const descArr = coinDetails?.description?.en?.split(". ");
  return (
    <>
      {loading && <LinearProgress sx={{ background: "var(--ori-blue)" }} />}

      <Box sx={{background:"linear-gradient(0deg,#0f051d 30%,#130749 70%)", padding:"50px 0px", minHeight:"100vh"}}>
      <Container sx={stylesFor.mainContainer }>
        {
          !loading &&

          (
            <>
              <Box sx={stylesFor.coinDetailsBox}>
                <Box sx={{ height: 140, width: 140, marginBottom: 2 }}>
                  <img style={{ height: "100%", width: "100%" }} src={coinDetails?.image?.large} />
                </Box>
                <Box>
                  <Typography sx={{ textAlign: "center", fontSize: 35, fontWeight: 700 }}>
                    {coinDetails?.name}
                  </Typography>
                  <Typography sx={{ textAlign: "center", fontSize: 20, fontWeight: 500, marginBottom: 1 }}>
                    Rank: #{coinDetails?.market_cap_rank}
                  </Typography>
                  <Typography sx={{ marginBottom: 1, color:"var(--ori-grey)"}}>
                    {descArr && descArr[0] ? parse(`${descArr[0]}.${descArr[1]}.`): "Description not found"}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    <span style={stylesFor.marketDetailsTitle}>Current Price:  </span>
                    {symbol}{coinDetails?.market_data?.current_price[currency.toLowerCase()]}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    <span style={stylesFor.marketDetailsTitle}>Market Cap:  </span>
                    {symbol}
                    {coinDetails?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6)}
                  </Typography>
                  <Typography sx={{ color: positiveChange ? "var(--ori-green)" : "var(--ori-red)", fontWeight: 600 }}>
                    <span style={stylesFor.marketDetailsTitle}>24h Change:  </span>{!!positiveChange && " + "}{coinDetails?.market_data?.price_change_24h.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={stylesFor.chartContainer}>
                <CoinChart coinId={coinId} days={days} />
                <Box sx={{width:"100%", display:"flex", justifyContent:"space-around"}}>
                  {
                    chartDays?.map((days)=>{
                      return(
                        <Button sx={{background:"linear-gradient(25deg,#2600fc,#ff00ea)",fontSize:{xs:8,sm:13}}} key={days.value} onClick = {()=>{setDays(days.value)}} >{days.label}</Button>
                      )
                    })
                  }
                </Box>
              </Box>
            </>
          )
        }
      </Container>
      </Box>

    </>
  )
}

export default CoinDetail