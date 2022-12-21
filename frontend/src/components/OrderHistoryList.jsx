
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SmallStockCard from './SmallStockCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import OrderHistoryCard from './OrderHistoryCard'

const style = {
    width: '100%',
    bgcolor: 'background.paper',
};

export default function OrderHistoryList({orderHistory}) {

    const exampleData = [
        {
          ordertime: "2022-12-20 13:00:54",
          quantity: 1,
          ticker: "TSLA",
          type: "SELL"
        },
        {
          ordertime: "2022-12-20 12:30:34",
          quantity: 2,
          ticker: "TSLA",
          type: "SELL"
        },
        {
          ordertime: "2022-12-20 12:29:58",
          quantity: 6,
          ticker: "TSLA",
          type: "BUY"
        },
        {
          ordertime: "2022-12-20 12:29:51",
          quantity: 3,
          ticker: "AAPL",
          type: "BUY"
        },
        {
          ordertime: "2022-12-20 12:29:46",
          quantity: 5,
          ticker: "MSFT",
          type: "BUY"
        }
    ]

    return (
        <Container style={{width: '520'}}>
            <Typography sx={{fontWeight: 'bold', paddingLeft:"15px"}} variant="h4" component="div" align='left'>
                My Order History
            </Typography>
        <List sx={style} component="nav" aria-label="order history">
            {orderHistory.map((data, i) => {
                return (<>
                    <ListItem>
                        <OrderHistoryCard key={i} order={data}/>
                    </ListItem>
                </>)
            })}
            
        </List>
        </Container>
  );
}