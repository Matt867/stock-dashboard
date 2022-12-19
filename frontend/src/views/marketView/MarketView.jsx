import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MarketListItem from './components/MarketListItem';


// Get demo data as JSON
import data from "../../../temp/market-view-data/TSLA.json";
const weekData = data.slice(0, 7);
console.log(weekData);

function generate(element) {
    return [
      ["Facebook", "FCBK", weekData], 
      ["Alphabet", "ALPH", weekData], 
      ["Apple", "APPL", weekData], 
      ["Tesla", "TSLA", weekData],
    ].map(
        ([name, ticker, values]) => React.cloneElement(element, { ticker, name, values })
    );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        />
      </FormGroup>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List 
              dense={dense}
              sx={{ width: '100%', bgcolor: 'background.paper' }}
            >
              {generate(<MarketListItem secondary={secondary} />,)}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}