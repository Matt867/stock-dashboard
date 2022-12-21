import * as React from 'react';
import Box from '@mui/material/Box';
import { green, red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



/**
 * 
 * needs ticker, price, percentchange 
 */


export default function SmallStockCard({ ticker, price, percentchange}) {
    const [colorDepth, setColorDepth] = useState(300);
    const navigate = useNavigate()

    function handleMouseOver() {
        setColorDepth(600);
    }
    
    function handleMouseLeave() {
        setColorDepth(300);
    }

    return (
        <Card onClick={() => {navigate(`/stock/${ticker}`)}} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} sx={{ width: '100%' }} style={{backgroundColor: percentchange > 0 ? green[colorDepth]: red[colorDepth]}} >
        <CardContent>
            <Typography sx={{fontWeight: 'bold'}} variant="h5" component="div">
            {ticker}
            </Typography>
            <Typography variant="h5" component="div">
            {price} USD
            </Typography>
            <Typography sx={{fontWeight: 'bold'}} variant="h5" component="div">
            {percentchange}%
            </Typography>
        </CardContent>
        </Card>
  );
}