import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import './App.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useState } from 'react';

import { themeOptions } from './utils/themeOption';
import InteractiveList from './views/marketView/MarketView';
import BarChart from './components/BarChart';
import AreaChart from './components/AreaCart';
import Homepage from './views/homepage/Homepage.jsx';
import SignUp from './views/signup/signup';
import LogIn from './views/login/login';
import { Routes, Route } from 'react-router-dom';
import Order from './views/order/order';

function App() {

  const [token, setToken] = useState("")
  const [count, setCount] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)

  const darkTheme = createTheme(themeOptions);

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<Homepage token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path="/signup" element={<SignUp token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path="/login" element={<LogIn token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path="/order" element={<Order token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
