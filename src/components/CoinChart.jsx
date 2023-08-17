import { ContextCryptoState } from "../context/CryptoContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import { CircularProgress } from "@mui/material";

const CoinChart = ({ coinId , days}) => {
    const { currency } = ContextCryptoState();
    const [coinsHistoricData, setCoinsHistoricData] = useState();
    const [loading, setLoading] = useState(false);

    const fetchHistoricCoinData = async (id, currency, days) => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
        return data;
    }
    useEffect(() => {
        let subscribe = true;
        setLoading(true);
        fetchHistoricCoinData(coinId, currency, days)
        .then(data => {
            subscribe && setCoinsHistoricData(data.prices);
            setLoading(false);
        })
        return ()=>{subscribe = false;}
    }, [days, currency])
    return (
        <>
            {
                loading ? 
                (<CircularProgress />) 
                : 
                (<Line
                    data={{
                        labels: coinsHistoricData?.map((coinsData) => {
                            let date = new Date(coinsData[0]);
                            let time = date.getHours() > 12 ?
                                `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                data: coinsHistoricData?.map((coinsData) => coinsData[1]),
                                label: `Price (Past ${days} Days) in ${currency}`,
                                borderColor:"#EEBC1D",
                            },
                        ],
                    }}
                    options={{
                        elements: {
                          point: {
                            radius: 0,
                          },
                        },
                      }}
                />)

            }
        </>
    )
}
export default CoinChart;