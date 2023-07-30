import React, { useEffect, useState } from 'react'
import { fetchApiData } from '../utils/api'

export const useFetch = (apiUrl, currency,perPage) => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        let subscribe = true;
        fetchApiData(apiUrl, currency,perPage)
        .then(data =>{
            subscribe && setApiData(data);
            setTimeout(()=>setLoading(false),3000);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
        })
        return()=>{
            subscribe= false;
        }
    },[])
  return {apiData, loading}
}