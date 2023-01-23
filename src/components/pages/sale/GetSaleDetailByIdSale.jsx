import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal';

const GetSaleDetailByIdSale = () => {

    const {idVenta} = useParams();

    const [saleDetail, setSaleDetail] = useState([]);

    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getSales = async () => {
            const salesDetail = await request.get("sale-detail/findByIdSale/"+idVenta);


            if (salesDetail.data.status === "FAILED" || salesDetail.data.status === "DANGER"){
                setActiveModal(true)
                setStatus(salesDetail.data.status);
                setMessage(salesDetail.data.message);
                setTimeout(()=>{
                    setActiveModal(false)
                }, 1700)
                return;
            }

            setSaleDetail(salesDetail.data.data);
        }
        getSales();
    }, [])

  return (
    <>
      <div className="getSale">
        <div className="getSale__container">
          <h1 className="getSale__title">Detalles de la venta número {idVenta}</h1>  
          <div className="getSale__content">
          <table className='getSale__table'>
            <thead className='getSale__head'>
              <tr className='getSale__headrow'>
                <th className='getSale__headcolumn'>Id</th>
                <th className='getSale__headcolumn'>Nombre producto</th>
                <th className='getSale__headcolumn'>Fecha venta</th>
                <th className='getSale__headcolumn'>Precio venta</th>
                <th className='getSale__headcolumn'>Cantidad</th>
                <th className='getSale__headcolumn'>Tipo</th>
                <th className='getSale__headcolumn'>Total venta</th>
                <th className='getSale__headcolumn'>Opciones</th>
              </tr>
            </thead>
            <tbody className='getSale__body'>
              {
                saleDetail.map((s, i) => (
                <tr key={s.numVenta} className={'getSale__bodyrow'}>
                  <td className='getSale__bodycolumn'>{i+1}</td>
                  <td className='getSale__bodycolumn'>
                    <p className='getSale__nameData'>{s.nombreProducto}</p>
                  </td>
                  <td className='getSale__bodycolumn'>{new Date(s.fechaVenta).toLocaleDateString()}</td>
                  <td className='getSale__bodycolumn'>{"S/ "+s.precioUnitario}</td>
                  <td className='getSale__bodycolumn'>{s.cantidadVenta}</td>
                  <td className='getSale__bodycolumn'>{
                    s.cantidadTipo === "und" ? "Unidad" : (s.cantidadTipo === "cm" ? "Centimetro" : "Metro")
                  }</td>
                  <td className='getSale__bodycolumn'>{"S/ "+s.totalVentaIndividual}</td>
                  <td className='getSale__bodycolumn'>
                    <button className='getSale__bodybtn' /* onClick={() => {openEditSale(p)}} */>Editar</button>
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
      <MessageModal activeModal={activeModal} message={message} status={status} />
    </>
  )
}

export default GetSaleDetailByIdSale