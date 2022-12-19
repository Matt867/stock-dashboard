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


function App() {
  const [count, setCount] = useState(0)

  const darkTheme = createTheme(themeOptions);

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {/* <InteractiveList /> */}
        <Homepage/>
        {/* <BarChart /> */}
      </main>
    </ThemeProvider>
    </>
  )
}

export default App
