import * as React from 'react';
import TopBar from '../../components/TopBar'
import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


export default function Stock({token, setToken, loggedIn, setLoggedIn}) {
    const { TICK } = useParams()
    const [ticker, setTicker] = useState("")
    const [company, setCompany] = useState("")
    const [open, setOpen] = useState(0)
    const [high, setHigh] = useState(0)
    const [low, setLow] = useState(0)
    const [current, setCurrent] = useState(0)
    const [percentChange, setPercentChange] = useState(0)

    
    

    useEffect(() => {
        async function getInfo() {
            const response = await fetch(`http://88.198.184.61:2345/search/${ticker}`)
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
    
                setCompany(data.name)
                setOpen(data.open)
                setHigh(data.high)
                setLow(data.low)
                setCurrent(data.price)
                setPercentChange(data.percentchange)
            }
        }

        const url = window.location.href
        console.log(url.substring(url.lastIndexOf("/") + 1, url.length))
        setTicker(url.substring(url.lastIndexOf("/") + 1, url.length))
        getInfo()

    })



    return (
        <>
            <TopBar></TopBar>
            <Container>
                <Box>
                    <Card sx={{ marginTop: '30px'}}>
                        <CardContent>
                            <Typography sx={{fontWeight: 'bold'}} variant="h4" component="div">
                                {company} - {ticker}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="h4" component="div">
                                {current}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {open}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Today's high: {high}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Today's low: {low}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', color: percentChange > 0 ? 'green' : 'red'}} variant="h5" component="div">
                                Percent change today: {percentChange}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    )
}