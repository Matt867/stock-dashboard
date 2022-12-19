import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SmallStockCard from './SmallStockCard';

const style = {
  width: '100%',
  maxWidth: 280,
  bgcolor: 'background.paper',
};

export default function ListDividers({stocks}) {
  return (
    <List sx={style} component="nav" aria-label="hot stocks">

      {stocks.map((stock) => {
        return <>
        <ListItem>
          <SmallStockCard ticker={stock.ticker} price={stock.price} percentchange={stock.percentchange}/>
        </ListItem>
        <Divider />
        </>
      })}
      
    </List>
  );
}