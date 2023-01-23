import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TicketContext } from '../../contexts/ticket/TicketState'
import "./../../../assets/css/ticket/getTicket.css"
import ShowTicket from './ShowTicket'

const GetTicket = () => {

  const {listTickets, changeTicketStatus, setActiveShowTicket, functionShowTicket} = useContext(TicketContext)

  const handleClickShowTicket = (idBoleta) => {
    functionShowTicket(idBoleta);
    setActiveShowTicket(true)
  }

  return (
    <>
      <div className="getTicket">
        <div className="getTicket__container">
          <h1 className="getTicket__title">Emisión de boletas</h1>  
          <div className="getTicket__content">
          <table className='getTicket__table'>
            <thead className='getTicket__head'>
              <tr className='getTicket__headrow'>
                <th className='getTicket__headcolumn'>Nro. Boleta</th>
                <th className='getTicket__headcolumn'>Subtotal</th>
                <th className='getTicket__headcolumn'>Descuento</th>
                <th className='getTicket__headcolumn'>Precio total</th>
                <th className='getTicket__headcolumn'>Fecha registro</th>
                <th className='getTicket__headcolumn'>Fecha emsión</th>
                <th className='getTicket__headcolumn'>Estado</th>
                <th className='getTicket__headcolumn'>Opciones</th>
              </tr>
            </thead>
            <tbody className='getTicket__body'>
              {
                listTickets.map((t, i) => (
                <tr key={t.idBoleta} className={'getTicket__bodyrow'} /* className={!p.estadoTicketo ? 'getTicket__bodyrow getTicket__bodyrow--disabled': 'getTicket__bodyrow'} */>
                  <td className='getTicket__bodycolumn'>{t.idBoleta}</td>
                  <td className='getTicket__bodycolumn'>{"S/ "+parseFloat(t?.subtotalBoleta).toFixed(2) || ""}</td>
                  <td className='getTicket__bodycolumn'>{"S/ "+parseFloat(t?.descuentoBoleta).toFixed(2) || ""}</td>
                  <td className='getTicket__bodycolumn'>{"S/ "+parseFloat(t?.totalPagarBoleta).toFixed(2) || ""}</td>
                  <td className='getTicket__bodycolumn'>{new Date(t?.fechaRegistroBoleta).toLocaleDateString()}</td>
                  <td className='getTicket__bodycolumn'>{t?.fechaEmsiónBoleta ? new Date(t?.fechaEmsiónBoleta).toLocaleDateString() :  "-- / -- / ----"}</td>
                  <td className='getTicket__bodycolumn'>
                    <input onChange={() => changeTicketStatus(t.idBoleta)} defaultChecked={t.estadoBoleta ? true : false} type="checkbox" className='getTicket__bodycheck'/>
                  </td>        
                  <td className='getTicket__bodycolumn'>
                    {/* <Link to={"/consulta-ventas/"+t.idBoleta} className='getTicket__bodybtn--details'>Ver boleta</Link> */}
                    <button className='getTicket__bodybtn--details' onClick={() => {handleClickShowTicket(t.idBoleta)}} disabled={t.estadoBoleta ? false : true}>Ver boleta</button>
                    <button className='getTicket__bodybtn' /* onClick={() => {openEditTicket(s)}} */>Boleta virtual</button>
                  </td>
              </tr>))
              }
            </tbody>
          </table>
          <div className='spaceTicket'>
          </div>
          </div>
        </div>  
      </div> 
      <ShowTicket/>
      {/* <EditTicket activeEditTicket={activeEditTicket} setActiveEditTicket={setActiveEditTicket} /> */}
    </>
  )
}

export default GetTicket