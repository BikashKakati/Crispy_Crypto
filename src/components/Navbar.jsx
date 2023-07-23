import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, Button} from '@mui/material';

const stylesFor = {
  logo:{
    color:"gold",
    fontWeight:700,
    cursor:"pointer",
    whiteSpace:"nowrap",
    fontSize: {xs:18, sm:25},
    textTransform:"capitalize",
  },
  
}

const Navbar = () => {

  return (
    <AppBar sx={{background:"#111"}} position='sticky'>
        <Toolbar>
            <Typography sx={{flex:1}}><Button sx={stylesFor.logo}>CRISPY CRYPTO</Button> </Typography>
            <Select variant='outlined' sx={{width: 100, height: 40}} defaultValue={"USD"}>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar