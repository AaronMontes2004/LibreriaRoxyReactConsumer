import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import "../../../assets/css/purchase/getPurchase.css"
import { PurchaseContext } from '../../contexts/purchase/PurchaseState'
import EditPurchase from './EditPurchase'

const GetPurchase = () => {

  const {purchases, setEditPurchase} = useContext(PurchaseContext)
  const [activeEditPurchase, setActiveEditPurchase] = useState()

  const openEditPurchase = (p) => {
    setActiveEditPurchase(true);
    setEditPurchase({...p})
  }

  return (
    <>
      <div className="getPurchase">
        <div className="getPurchase__container">
          <h1 className="getPurchase__title">Consulta de compras</h1>  
          <div className="getPurchase__content">
          <table className='getPurchase__table'>
            <thead className='getPurchase__head'>
              <tr className='getPurchase__headrow'>
                <th className='getPurchase__headcolumn'>Nro. Compra</th>
                <th className='getPurchase__headcolumn'>Fecha de compra</th>
                <th className='getPurchase__headcolumn'>Monto total</th>
                <th className='getPurchase__headcolumn'>Proveedor</th>
                <th className='getPurchase__headcolumn'>Opciones</th>
              </tr>
            </thead>
            <tbody className='getPurchase__body'>
              {
                purchases.map((p, i) => (
                <tr key={p.idCompra} className={'getPurchase__bodyrow'} /* className={!p.estadoPurchaseo ? 'getPurchase__bodyrow getPurchase__bodyrow--disabled': 'getPurchase__bodyrow'} */>
                  <td className='getPurchase__bodycolumn'>{p.idCompra}</td>
                  <td className='getPurchase__bodycolumn'>{new Date(p.fechaCompra).toLocaleDateString()}</td>
                  <td className='getPurchase__bodycolumn'>{"S/ "+p.totalPagar}</td>
                  <td className='getPurchase__bodycolumn'>{p.nombreProveedor}</td>
                  <td className='getPurchase__bodycolumn'>
                    <button className='getPurchase__bodybtn' onClick={() => {openEditPurchase(p)}} /* onClick={() => {openEditPurchase(p)}} */>Editar</button>
                    <Link to={"/consulta-compras/"+p.idCompra} className='getPurchase__bodybtn--details' /* onClick={() => {openEditPurchase(p)}} */>Ver detalles</Link>
                  </td>
              </tr>))
              }
            </tbody>
          </table>
          <div className='spacePurchase'>
          </div>
          </div>
        </div>  
      </div> 
      <EditPurchase activeEditPurchase={activeEditPurchase} setActiveEditPurchase={setActiveEditPurchase} />
    </>
  )
}

export default GetPurchase