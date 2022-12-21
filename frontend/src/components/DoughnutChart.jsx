import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState, useContext } from 'react';
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { TokenContext } from "../context/TokenContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props) {

    const [tickerLabels, setTickerLabels] = useState([])
    const [prices, setPrices] = useState([])
    const {token, setToken} = useContext(TokenContext)

    useEffect(() => {
        async function getDoughnutData () {
            const response = await fetch('http://88.198.184.61:2345/portfolio/chart', {
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
            setTickerLabels(data[0]);
            setPrices(data[1]);
        }

        getDoughnutData()
    },[])


    let data = {
        labels: tickerLabels,
        datasets: [
          {
            label: 'Investment Value',
            data: prices,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          },
        ],
    };


    return (<>
        <Doughnut data={data}/>
    </>);
}