import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';

export const TicketContext = createContext();

const TicketState = (props) => {

  const [listTickets, setListTicket] = useState([]);
  const [pageStatus, setPageStatus] = useState(true);

  const [activeShowTicket, setActiveShowTicket] = useState(false);

  const [detailTickets, setDetailTickets] = useState([]);
  const [ticket, setTicket] = useState({});

  const changeTicketStatus = async (idBoleta) => {
    const result = await request.put("ticket/changeStatus/"+idBoleta)
    console.log(result);
    setPageStatus(!pageStatus);
  }

  const functionShowTicket = async (idBoleta) => {
    const result = await request.get("ticket/show/"+idBoleta)
    setDetailTickets([...result.data.data])
    const resultTicket = await request.get("ticket/"+idBoleta)
    setTicket({...resultTicket.data.data})
    console.log(result.data);
    console.log(resultTicket.data);
  }

  useEffect(() => {
    const listTickets = async () => {
      const result = await request.get("ticket");
      setListTicket(result.data.data);
    }
    listTickets();
  }, [pageStatus])

  useEffect(() => {
    console.log(detailTickets);
    console.log(ticket);
  }, [ticket])

  return (
    <TicketContext.Provider value={{
      listTickets: listTickets,
      changeTicketStatus: changeTicketStatus,
      functionShowTicket: functionShowTicket,
      activeShowTicket: activeShowTicket,
      setActiveShowTicket: setActiveShowTicket,
      detailTickets: detailTickets,
      ticket: ticket,
      setDetailTickets: setDetailTickets,
      setTicket: setTicket
    }}>
        {props.children}
        <Outlet/>
    </TicketContext.Provider>
  )
}

export default TicketState