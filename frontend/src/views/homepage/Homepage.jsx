import * as React from 'react';
import SmallStockCard from '../../components/SmallStockCard'
import HotStocksSidebar from '../../components/HotStocksSidebar'
import TopBar from '../../components/TopBar'
import PortFolioBalance from '../../components/PortfolioBalance';
import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import OrderHistoryList from '../../components/OrderHistoryList';
import { Container } from '@mui/system';


export default function Homepage({token, setToken, loggedIn, setLoggedIn}) {

    const [hotStocks, setHotStocks] = useState([])
    const [balance, setBalance] = useState(0)
    const [orderHistory, setOrderHistory] = useState([])

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
            console.log(token)
            const response = await fetch('http://88.198.184.61:2345/portfolio/value', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: 'fb0dfece579cd25ecdd81789905eadb4'
                })
            })
            const data = await response.text();
            setBalance(data);
        }

        async function getOrderHistory () {
            console.log(token)
            const response = await fetch('http://88.198.184.61:2345/orders', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: 'fb0dfece579cd25ecdd81789905eadb4'
                })
            })
            const data = await response.json();
            setOrderHistory(data);
        }

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
                paddingTop: '30px'
            }}>
                <Container>
                    <OrderHistoryList orderHistory={orderHistory}/>
                </Container>
                <HotStocksSidebar stocks={hotStocks}/>
            </Container>
        </>
    )
}