import * as React from 'react';
import SmallStockCard from '../../components/SmallStockCard'
import HotStocksSidebar from '../../components/HotStocksSidebar'
import TopBar from '../../components/TopBar'
import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'

const stocks = [
    {
        ticker: "TSLA",
        price: 125.53,
        percentchange: 6.3
    },
    {
        ticker: "AAPL",
        price: 632.51,
        percentchange: -2.1
    },
    {
        ticker: "MSFT",
        price: 3.13,
        percentchange: 0.2
    },
    {
        ticker: "BBYD",
        price: 1.32,
        percentchange: 16.3
    },
]


export default function Homepage() {

    const [hotStocks, setHotStocks] = useState([])

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
            console.log(data);
            setHotStocks(data);
        }
        
        populateTopStocks()
    }, [])



    return (
        <>
            <TopBar></TopBar>
            <HotStocksSidebar stocks={hotStocks}/>
        </>
    )
}