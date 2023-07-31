import React from 'react'
import {Box} from "@mui/material";


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
        borderTop:"6px solid var(--ori-gold)",
        animation:"1s spinner linear infinite",
    }
}
const Loader = () => {
  return (
     <Box sx={stylesFor.loaderBox}>
        <Box sx={stylesFor.loader}></Box>
     </Box>
  )
}

export default Loader