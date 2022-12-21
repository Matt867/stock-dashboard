import * as React from 'react';
import SmallStockCard from '../../components/SmallStockCard'
import HotStocksSidebar from '../../components/HotStocksSidebar'
import TopBar from '../../components/TopBar'
import PortFolioBalance from '../../components/PortfolioBalance';
import { useEffect, useState, useContext } from 'react';
import {nanoid} from 'nanoid'
import OrderHistoryList from '../../components/OrderHistoryList';
import PortfolioList from '../../components/PortfolioList';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { TokenContext } from '../../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import DoughnutChart from '../../components/DoughnutChart';


const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 57,
    height: 35,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(23px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#2196f3',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.primary.main
            : theme.palette.red[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 30,
      height: 30,
      transform: 'translateY(0.4px)'
    },
    '& .MuiSwitch-track': {
      borderRadius: 57 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#2196f3' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  

export default function Homepage() {

    const [hotStocks, setHotStocks] = useState([])
    const [portfolio, setPortfolio] = useState([])
    const [balance, setBalance] = useState(0)
    const [orderHistory, setOrderHistory] = useState([])
    const [showPortfolio, setShowPortfolio] = useState(true)

    const navigate = useNavigate()

    const {token, setToken} = useContext(TokenContext)

    useEffect(() => {
        async function populateTopStocks () {
            const response = await fetch('http://88.198.184.61:2345/gettopstocks', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    count: 5
                })
            })
            const data = await response.json();
            setHotStocks(data);
        }

        async function getBalance () {
            const response = await fetch('http://88.198.184.61:2345/portfolio/value', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            })
            const data = await response.text();
            setBalance(data);
        }

        async function getOrderHistory () {
            const response = await fetch('http://88.198.184.61:2345/orders', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            })
            const data = await response.json();
            setOrderHistory(data);
        }

        async function getPortfolio () {
            const response = await fetch('http://88.198.184.61:2345/portfolio', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            })
            const data = await response.json();
            setPortfolio(data);
        }

        if (!token) {
            navigate('/login')
        }

        getPortfolio()
        getOrderHistory()
        getBalance()
        populateTopStocks()
    }, [])

    return (
        <>
            <TopBar></TopBar>
            {/* {balance} */}
            <PortFolioBalance value={balance}/>
            <Container sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridTemplateColumns: '3fr 1fr',
                paddingTop: '20px'
            }}>
                {/* <ControlledSwitches setParent={(val) => {
                    setShowPortfolio(val)
                    console.log(val)
                }}/> */}
                <Container>
                    <Container sx={{display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'space-between', marginBottom:'10px'}}>
                        <Button variant="outlined" style={{ marginLeft: '15px', width:'265px'}} onClick={() => {navigate('/order')}}>Make an order</Button>
                        <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft:'10px'}}>
                            <Typography>
                                Order History
                            </Typography>
                            <IOSSwitch onClick={() => setShowPortfolio(!showPortfolio)} sx={{ m: 1 }} defaultChecked/>
                            <Typography>
                                Portfolio
                            </Typography>
                        </Stack>
                    </Container>
                    {showPortfolio ? <Container><Container sx={{width:'500px', height: '500px'}}><DoughnutChart/></Container><PortfolioList portfolio={portfolio}/></Container>: <OrderHistoryList orderHistory={orderHistory}/>}
                </Container>
                <HotStocksSidebar stocks={hotStocks}/>
            </Container>
        </>
    )
}