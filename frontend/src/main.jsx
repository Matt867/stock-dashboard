import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import TokenContextProvider from './context/TokenContext'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TokenContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TokenContextProvider>
  </React.StrictMode>,
)
