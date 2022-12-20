import * as React from 'react';
import Box from '@mui/material/Box';
import { green, red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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


export default function OrderHistoryCard({ order }) {

    return (
        <Card sx={{ width: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
            <Typography sx={{fontWeight: 'bold'}} variant="h5" component="div" style={{color: order['type'] == 'SELL' ? red[600] : green[600]}}>
            {order['type']}
            </Typography>
            <Typography variant="h5" component="div">
            Ticker: {order["ticker"]}
            </Typography>
            <Typography sx={{fontWeight: 'bold'}} variant="h5" component="div">
            Quantity {order["quantity"]}
            </Typography>
            <Typography sx={{fontStyle: 'oblique'}} variant="h5" component="div">
            {order["ordertime"]}
            </Typography>
        </CardContent>
        </Card>
  );
}