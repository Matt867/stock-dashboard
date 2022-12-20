import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from "react-router-dom";
import BuySellSwitch from '../../components/buysellswitch';

const theme = createTheme();

export default function Order({token, setToken, loggedIn, setLoggedIn}) {

  const [ticker, setTicker] = useState("")
  const [quantity, setQuantity] = useState("")
  const [checked, setChecked] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event)
    let url = "";
    checked ? url = "http://88.198.184.61:2345/buy" : url = "http://88.198.184.61:2345/sell";
    
    const response = await fetch(url, {
          method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  ticker: ticker,
                  quantity: quantity,
                  token: token,
              })
      })

  }

  React.useEffect(() => {
    console.log("change detected", checked)
  }, [checked])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <MonetizationOnIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Order
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BuySellSwitch changeSwitch = {setChecked}></BuySellSwitch>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ticker"
                  id="ticker"
                  label="Ticker"
                  onChange={(e) => setTicker(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="quantity"
                  id="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  autoComplete="new-quantity"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor: '#2E3B55'}}
            >
              Order
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )};