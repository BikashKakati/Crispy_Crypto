import React from 'react';
import Carousel from "../components/Carousel";
import CoinTable from '../components/CoinTable';
import { Container } from '@mui/material';
const Home = () => {
    return (
        <>
            <Carousel />
            <CoinTable />
        </>
    )
}

export default Home