
import { useState } from 'react';
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
    margin: " 20px auto",
    justifyContent: "center",
    gap: 5
  },
  coinDetailsBox: {
    maxWidth: 350,
    borderRight: "1px solid var(--ori-grey)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 15px 20px 0"
  },
  marketDetailsTitle: {
    fontSize: 20,
    fontWeight: 400,
    color: "var(--ori-gold)",
  },

}

const CoinDetail = () => {
  const { id: coinId } = useParams();
  const { apiData: coinDetails, loading } = useFetch(coinId);
  const [days, setDays] = useState(1);
  const { symbol, currency } = ContextCryptoState();

  const positiveChange = coinDetails?.market_data?.price_change_24h > 0;
  const descArr = coinDetails?.description?.en?.split(". ");
  return (
    <>
      {loading && <LinearProgress sx={{ background: "var(--ori-gold)" }} />}

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
                  <Typography sx={{ marginBottom: 1 }}>
                    {parse(`${descArr && descArr[0]}.${descArr && descArr[1]}.`)}
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
                    <span style={stylesFor.marketDetailsTitle}>24h Change:  </span>{!!positiveChange && " + "}{coinDetails?.market_data?.price_change_24h}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: 800 , display: "flex", flexDirection: "column", gap: 4, alignItems: "center", justifyContent:"center"}}>
                <CoinChart coinId={coinId} days={days} />
                <Box sx={{width:"100%", display:"flex", justifyContent:"space-around"}}>
                  {
                    chartDays?.map((days)=>{
                      return(
                        <Button sx={{background:"var(--ori-gold)"}} key={days.value} onClick = {()=>{setDays(days.value)}} >{days.label}</Button>
                      )
                    })
                  }
                </Box>
              </Box>
            </>
          )
        }
      </Container>
    </>
  )
}

export default CoinDetail