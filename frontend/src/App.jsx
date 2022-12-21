import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import './App.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from './utils/themeOption';
import Homepage from './views/homepage/Homepage.jsx';
import SignUp from './views/signup/signup';
import LogIn from './views/login/login';
import { Routes, Route } from 'react-router-dom';
import Order from './views/order/order';
import Stock from './views/individualstock/stock';


function App() {

  const darkTheme = createTheme(themeOptions);

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/stock/:TICK" element={<Stock/>}/>
          </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
