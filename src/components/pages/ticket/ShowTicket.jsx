import React from 'react'
import { useContext } from 'react'
import { TicketContext } from '../../contexts/ticket/TicketState'
import "./../../../assets/css/ticket/showTicket.css"

const ShowTicket = () => {

    const {activeShowTicket, setActiveShowTicket, ticket, detailTickets, setDetailTickets, setTicket} = useContext(TicketContext)

    const handleClickCloseShowTicket = ()=> {
      setActiveShowTicket(false);
      setTimeout(() => {
        setDetailTickets([]);
        setTicket({});
      }, 500)
    }

  return (
    <>
    <div className={!activeShowTicket ? 'showTicket' : 'showTicket showTicket--show'}>
      <div className="showTicket__index">
        <div className="spaceTicket"></div>
        <div className="showTicket__form">
          <div className='showTicket__container'> 
            <div className="showTicket__content1">
              <h1 className='showTicket__title'>{"Boleta de venta N°"+ticket.idBoleta || ""}</h1>
              <h2 className='showTicket__title'>{"RUC: Aquí el RUC"}</h2>
            </div>
            <div className="showTicket__content2">
              <div className="showTicket__contentText">
                <h2 className='showTicket__name'>Libreria Roxy</h2>
                <p className='showTicket__text--title'>Fecha emisión:</p>
                <p className='showTicket__text--text'>{new Date(ticket.fechaRegistroBoleta).toLocaleDateString()}</p>
                <p className='showTicket__text--title'>Tipo moneda:</p>
                <p className='showTicket__text--text'>Soles</p>
              </div>
            </div>
            <div className="showTicket__content3">
              <table className='showTicket__table'>
                <thead className='showTicket__thead'>
                  <tr className='showTicket__tr'>
                    <th className='showTicket__th' style={{width: "30%"}}>Nombre del producto</th>
                    <th className='showTicket__th' style={{width: "15%"}}>Cantidad</th>
                    <th className='showTicket__th' style={{width: "20%"}}>Unidad de medida</th>
                    <th className='showTicket__th' style={{width: "15%"}}>Valor unitario</th>
                    <th className='showTicket__th' style={{width: "20%"}}>Importe del item</th>
                  </tr>
                </thead>
                <tbody className='showTicket__tbody'>
                  { detailTickets.map((t) => (
                    <tr key={t.numVenta} className='showTicket__tr'>
                      <td title={t.nombreProducto} className='showTicket__td'>{t.nombreProducto}</td>
                      <td className='showTicket__td'>{t.cantidadVenta}</td>
                      <td className='showTicket__td'>{t.cantidadTipo}</td>
                      <td className='showTicket__td'>{t.precioUnitario}</td>
                      <td className='showTicket__td'>{t.totalVentaIndividual}</td>
                    </tr>
                  )) }
                </tbody>
              </table>
            </div>
            <div className="showTicket__content4">
              <div className="showTicket__finalData">
                <div className="showTicket__data">
                    <p className='showTicket__textData'>Total valor venta:</p>
                    <p className='showTicket__textData'>Descuento:</p>
                    <p className='showTicket__textData'>Importe total:</p>
                </div>
                <div className='showTicket__prices'>
                    <p className='showTicket__textData'>{"S/ "+ticket.subtotalBoleta}</p>
                    <p className='showTicket__textData'>{"S/ "+ticket.descuentoBoleta}</p>
                    <p className='showTicket__textData'>{"S/ "+ticket.totalPagarBoleta}</p>
                </div>
              </div>
            </div>
            <div className="showTicket__content5">
              <button className='showTicket__btnCloseTicket' onClick={() => {handleClickCloseShowTicket()}}>Cerrar</button>
            </div>
          </div>
        </div>
        <div className="spaceTicket"></div>
      </div>
    </div>   
    </>
  )
}

export default ShowTicket