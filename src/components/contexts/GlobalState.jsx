import React, { createContext } from 'react'
import { Outlet } from 'react-router-dom';

export const GlobalContext = createContext();

const GlobalState = (props) => {
  return (
    <GlobalContext.Provider value={{
        data: "HOLA COMO ESTAN"
      }}>
        {props.children}
        <Outlet/>
    </GlobalContext.Provider>
  )
}

export default GlobalState