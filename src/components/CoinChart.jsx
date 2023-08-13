import { ContextCryptoState } from "../context/CryptoContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import { CircularProgress } from "@mui/material";

const CoinChart = ({ coinId , days}) => {
    const { currency } = ContextCryptoState();
    const [coinsHistoricData, setCoinsHistoricData] = useState();

    const fetchHistoricCoinData = async (id, currency, days) => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoinsHistoricData(data.prices);
    }
    useEffect(() => {
        fetchHistoricCoinData(coinId, currency, days);
    }, [days])
    return (
        <>
            {
                !coinsHistoricData ? 
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