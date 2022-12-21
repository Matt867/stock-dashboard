
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SmallStockCard from './SmallStockCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import PortfolioEntryCard from './PortfolioEntryCard';

const style = {
    width: '100%',
    bgcolor: 'background.paper',
};

export default function PortfolioList({portfolio}) {

    const exampleData = [
        {
            ticker: "TSLA",
            quantity: 3
        },
        {
            ticker: "AAPL",
            quantity: 16
        },
        {
            ticker: "XOM",
            quantity: 4
        }
    ]

    return (
        <Container style={{width: '520'}}>
            <Typography sx={{fontWeight: 'bold', paddingLeft:"15px"}} variant="h4" component="div" align='left'>
                My Portfolio
            </Typography>
        <List sx={style} component="nav" aria-label="order history">
            {portfolio.map((data, i) => {
                return (<>
                    <ListItem>
                        <PortfolioEntryCard key={i} entry={data}/>
                    </ListItem>
                </>)
            })}
            
        </List>
        </Container>
  );
}