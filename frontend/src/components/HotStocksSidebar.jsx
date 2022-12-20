import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SmallStockCard from './SmallStockCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export default function ListDividers({stocks}) {
  return (
    <Container style={{width: '320px'}}>
      <Typography sx={{fontWeight: 'bold'}} variant="h4" component="div" align='center'>
          Hot Stocks
      </Typography>
      <List sx={style} component="nav" aria-label="hot stocks">
        {stocks.map((stock, i) => {
          return <>
          <ListItem>
            <SmallStockCard key={i} ticker={stock.ticker} price={stock.price} percentchange={stock.percentchange}/>
          </ListItem>
          {/* <Divider /> */}
          </>
        })}
      </List>
    </Container>
  );
}