import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom';

export const UserContext = createContext();

const UserState = (props) => {

  const [data, setData] = useState("LAS PERSONAS");

  return (
    <UserContext.Provider value={{
      data: data
    }}>
        { props.children }
        <Outlet/>
    </UserContext.Provider>
  )
}

export default UserState;