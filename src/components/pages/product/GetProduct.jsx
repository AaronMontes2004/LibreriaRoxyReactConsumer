import React, { useContext, useState } from 'react'
import { ProductContext } from '../../contexts/product/ProductState';
import "../../../assets/css/product/getProduct.css";
import { request } from '../../libs/urlConsumer';
import EditProduct from './EditProduct';

const GetProduct = () => {

  const { productList, pageStatus, setPageStatus, setEditProduct } = useContext(ProductContext);

  const [activeEditProduct, setActiveEditProduct] = useState(false);

  const functionChangeStatus = async(idProducto) => {
    const res = await request.put("product/changeStatus/"+idProducto);
    console.log(res);
    setPageStatus(!pageStatus);
  }

  const openEditProduct = (p) => {
    setActiveEditProduct(true);
    setEditProduct(p)
    console.log(p);
  }

  return (
    <>
    
    <div className='menuProduct'>
      <div className="menuProduct__container">
        <h1 className='menuProduct__title'>Consulta de producto</h1>
        <div className='getProduct'>
          <table className='getProduct__table'>
            <thead className='getProduct__head'>
              <tr className='getProduct__headrow'>
                <th className='getProduct__headcolumn' style={{width: "5%"}}>Id</th>
                <th className='getProduct__headcolumn' style={{width: "20%"}}>Nombre</th>
                <th className='getProduct__headcolumn' style={{width: "15%"}}>Stock</th>
                <th className='getProduct__headcolumn' style={{width: "10%"}}>Precio compra</th>
                <th className='getProduct__headcolumn' style={{width: "10%"}}>Precio venta</th>
                <th className='getProduct__headcolumn' style={{width: "5%"}}>Ubicación</th>
                <th className='getProduct__headcolumn' style={{width: "10%"}}>Categoria</th>
                <th className='getProduct__headcolumn' style={{width: "10%"}}>Estado</th>
                <th className='getProduct__headcolumn' style={{width: "10%"}}>Opciones</th>
              </tr>
            </thead>
            <tbody className='getProduct__body'>
              {
                productList.map((p, i) => (
                <tr key={p.idProducto} className={!p.estadoProducto ? 'getProduct__bodyrow getProduct__bodyrow--disabled': 'getProduct__bodyrow'}>
                  <td className='getProduct__bodycolumn' >{p.idProducto}</td>
                  <td className='getProduct__bodycolumn' >{p.nombreProducto}</td>
                  <td className='getProduct__bodycolumn' >{p.stockProducto+" unidades "+(p.medidaHabilitada ? (p.cantidadMedida == 0 || p.cantidadMedida == "" ? "" : (p.tipoMedida == "cm" || p.tipoMedida == "CM" ? "con "+p.cantidadMedida + " centimetros" : "con "+p.cantidadMedida + " metros")) : "")}</td>
                  <td className='getProduct__bodycolumn' >{p.precioCProducto}</td>
                  <td className='getProduct__bodycolumn' >{p.precioVProducto}</td>
                  <td className='getProduct__bodycolumn' >{p.nombreUbicacion}</td>
                  <td className='getProduct__bodycolumn' >{p.nombreCategoria}</td>
                  <td className='getProduct__bodycolumn' >
                    <input onChange={() => functionChangeStatus(p.idProducto)} defaultChecked={p.estadoProducto ? true : false} type="checkbox" className='getProduct__bodycheck'/>
                  </td>
                  <td className='getProduct__bodycolumn' >
                    <button disabled={!p.estadoProducto ? true : false} className='getProduct__bodybtn' onClick={() => {openEditProduct(p)}}>Editar</button>
                  </td>
              </tr>))
              }
            </tbody>
          </table>
          <div className='spaceProduct'>
          </div>
        </div>
      </div>
    </div>
    <EditProduct activeEditProduct={activeEditProduct} setActiveEditProduct={setActiveEditProduct} />
    </>
  )
}

export default GetProduct