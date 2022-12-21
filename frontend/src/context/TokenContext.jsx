// store.js

import React, { createContext, useState } from 'react'

export const TokenContext = createContext() // <- initialize Context using initialState

const TokenContextProvider = ({ children }) => {

  const [token, setToken] = useState(null)

  return (
    <TokenContext.Provider value={{token, setToken}}> {/* <- this value is gonna be Global state */} 
      {children}
    </TokenContext.Provider>
  )
}

export default TokenContextProvider;