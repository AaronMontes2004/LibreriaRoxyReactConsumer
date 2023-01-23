import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal';

const GetPurchaseDetailByIdPurchase = () => {

    const {idCompra} = useParams();

    const [purchaseDetail, setPurchaseDetail] = useState([]);

    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getCompras = async () => {
            const purchasesDetail = await request.get("purchase-detail/findByIdPurchase/"+idCompra);


            if (purchasesDetail.data.status === "FAILED" || purchasesDetail.data.status === "DANGER"){
                setActiveModal(true)
                setStatus(purchasesDetail.data.status);
                setMessage(purchasesDetail.data.message);
                setTimeout(()=>{
                    setActiveModal(false)
                }, 1700)
                return;
            }

            setPurchaseDetail(purchasesDetail.data.data);
        }
        getCompras();
    }, [])

  return (
    <>
      <div className="getPurchase">
        <div className="getPurchase__container">
          <h1 className="getPurchase__title">Detalles de la compra número {idCompra}</h1>  
          <div className="getPurchase__content">
          <table className='getPurchase__table'>
            <thead className='getPurchase__head'>
              <tr className='getPurchase__headrow'>
                <th className='getPurchase__headcolumn'>Id</th>
                <th className='getPurchase__headcolumn'>Nombre producto</th>
                <th className='getPurchase__headcolumn'>Fecha compra</th>
                <th className='getPurchase__headcolumn'>Precio compra</th>
                <th className='getPurchase__headcolumn'>Cantidad</th>
                <th className='getPurchase__headcolumn'>Total compra</th>
                <th className='getPurchase__headcolumn'>Opciones</th>
              </tr>
            </thead>
            <tbody className='getPurchase__body'>
              {
                purchaseDetail.map((p, i) => (
                <tr key={p.numCompra} className={'getPurchase__bodyrow'} >
                  <td className='getPurchase__bodycolumn'>{i+1}</td>
                  <td className='getPurchase__bodycolumn'>{p.nombreProducto}</td>
                  <td className='getPurchase__bodycolumn'>{new Date(p.fechaCompra).toLocaleDateString()}</td>
                  <td className='getPurchase__bodycolumn'>{"S/ "+p.precioCProducto}</td>
                  <td className='getPurchase__bodycolumn'>{p.cantidadCompra}</td>
                  <td className='getPurchase__bodycolumn'>{"S/ "+p.totalCompra}</td>
                  <td className='getPurchase__bodycolumn'>
                    <button className='getPurchase__bodybtn' /* onClick={() => {openEditPurchase(p)}} */>Editar</button>
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
      <MessageModal activeModal={activeModal} message={message} status={status} />
    </>
  )
}

export default GetPurchaseDetailByIdPurchase