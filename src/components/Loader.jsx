import React from 'react'
import {Box} from "@mui/material";


const Loader = () => {
    const stylesFor = {
        loaderBox:{
            maxWidth:"100vw",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        },
        loader:{
            width:60,
            height:60,
            borderRadius:"50%",
            border:"6px solid #fff",
            borderTop:"6px solid gold",
            animation:"1s spinner linear infinite",
        }
    }
  return (
     <Box sx={stylesFor.loaderBox}>
        <Box sx={stylesFor.loader}></Box>
     </Box>
  )
}

export default Loader