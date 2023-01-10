import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';

export const ProviderContext = createContext();

const ProviderState = (props) => {

  const [pageStatus, setPageStatus] = useState(true);
  const [providerList, setProviderList] = useState([]);

  const [editProvider, setEditProvider] = useState({});

  useEffect(() => {
    const listProvider = async() => {
      const providers = await request.get("provider");
      setProviderList(providers.data.data);
    }

    listProvider();
  }, [pageStatus])

  return (
    <ProviderContext.Provider value={{
      pageStatus: pageStatus,
      setPageStatus: setPageStatus,
      providerList: providerList,
      editProvider: editProvider,
      setEditProvider: setEditProvider
    }}>
      {props.children}
      <Outlet/>
    </ProviderContext.Provider>
  )
}

export default ProviderState