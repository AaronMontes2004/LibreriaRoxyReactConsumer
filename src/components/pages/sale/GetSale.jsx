import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SaleContext } from '../../contexts/sale/SaleState'
import "./../../../assets/css/sale/getSale.css"

const GetSale = () => {

  const { sales } = useContext(SaleContext)

  return (
    <>
      <div className="getSale">
        <div className="getSale__container">
          <h1 className="getSale__title">Consulta de ventas</h1>  
          <div className="getSale__content">
          <table className='getSale__table'>
            <thead className='getSale__head'>
              <tr className='getSale__headrow'>
                <th className='getSale__headcolumn'>Nro. Venta</th>
                <th className='getSale__headcolumn'>Fecha de venta</th>
                <th className='getSale__headcolumn'>Precio de venta</th>
                <th className='getSale__headcolumn'>Opciones</th>
              </tr>
            </thead>
            <tbody className='getSale__body'>
              {
                sales.map((s, i) => (
                <tr key={s.idVenta} className={'getSale__bodyrow'} /* className={!p.estadoSaleo ? 'getSale__bodyrow getSale__bodyrow--disabled': 'getSale__bodyrow'} */>
                  <td className='getSale__bodycolumn'>{s.idVenta}</td>
                  <td className='getSale__bodycolumn'>{new Date(s.fechaVenta).toLocaleDateString()}</td>
                  <td className='getSale__bodycolumn'>{"S/ "+s.totalVenta}</td>
                  <td className='getSale__bodycolumn'>
                    {/* <button className='getSale__bodybtn' onClick={() => {openEditSale(s)}}>Editar</button> */}
                    <Link to={"/consulta-ventas/"+s.idVenta} className='getSale__bodybtn--details'>Ver detalles</Link>
                  </td>
              </tr>))
              }
            </tbody>
          </table>
          <div className='spaceSale'>
          </div>
          </div>
        </div>  
      </div> 
      {/* <EditSale activeEditSale={activeEditSale} setActiveEditSale={setActiveEditSale} /> */}
    </>
  )
}

export default GetSale