import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';

const CoinDetail = () => {
  const {id:coinId} = useParams();
  const {apiData:coinDetails, loading} = useFetch(coinId);
  return (
    <div>CoinDetail</div>
  )
}

export default CoinDetail