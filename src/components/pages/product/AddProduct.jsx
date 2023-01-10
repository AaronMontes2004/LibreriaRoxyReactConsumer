import React, { useContext, useState } from 'react'
import { ProductContext } from '../../contexts/product/ProductState';
import MessageModal from '../../modal/MessageModal'
import "../../../assets/css/product/addProduct.css";
import { request } from '../../libs/urlConsumer';

const AddProduct = () => {

  const {pageStatus, setPageStatus, locationListProduct, categoryListProduct} = useContext(ProductContext);

  const [activeModal, setActiveModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({
    nombreProducto: "",
    descripcionProducto: "",
    stockProducto: 0,
    precioCProducto: 0,
    precioVProducto: 0,
    idUbicacion: "vacio",
    idCategoria: "vacio"
  });

  const handleChange = (e) =>{
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  }

  const addProduct = async () => {
    try {

      /* console.log("PASÓ XD");

      if (product.idUbicacion === null || product.idUbicacion === "" || product.idUbicacion === undefined){
        setActiveModal(true);
        setStatus("FAILED");
        setMessage("Debe seleccionar una ubicación");
        setTimeout(() => {
          setActiveModal(false);
        }, 1750);
        return;
      }

      if (product.idCategoria === null || product.idCategoria === "" || product.idCategoria === undefined){
        setActiveModal(true);
        setStatus("FAILED");
        setMessage("Debe seleccionar una categoria");
        setTimeout(() => {
          setActiveModal(false);
        }, 1750);
        return;
      } */

      const res = await request.post("product/", product);
  
      setActiveModal(true);
      setStatus(res.data.status);
      setMessage(res.data.message);
      setTimeout(() => {
        setActiveModal(false);
      }, 1750);
      setPageStatus(!pageStatus);
    } catch (error) {
      console.log(error);
      setActiveModal(true);
      setStatus("DANGER");
      setMessage("Error interno en el servidor, intentelo mas tarde");
      setTimeout(() => {
        setActiveModal(false);
      }, 1750);
    }
  }

  return (
    <>
    <div className="menuProduct">
      <h1 className='menuProduct__title'>Registro de producto</h1>
      <div className='addProduct'>
          <div className="addProduct__form">
            <div className='addProduct__container'>
              <label className='addProduct__title'>Nombre:</label>
              <input name='nombreProducto' type="text" placeholder='Ingrese un nombre para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>Descripción:</label>
              <input name='descripcionProducto' type="text" placeholder='Ingrese una descripción para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>Stock:</label>
              <input name='stockProducto' type="number" maxLength={4} min={1} max={999} minLength={0} placeholder='Ingrese el stock para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>Precio compra:</label>
              <input name='precioCProducto' type="text" placeholder='Ingrese el precio de compra para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>Precio venta:</label>
              <input name='precioVProducto' type="text" placeholder='Ingrese el precio de venta para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>Ubicación:</label>
              {/* <input type="text" placeholder='' className='addProduct__input' onChange={handleChange}/> */}
              <select name='idUbicacion' className='addProduct__input' placeholder='Seleccione una ubicación' onChange={handleChange}>
                <option value={"vacio"} className={"addProduct__option"}>Seleccione una ubicación</option>
                {
                  locationListProduct.map((loc) => (
                    <option key={loc.idUbicacion} value={loc.idUbicacion} className={"addProduct__option"}>{loc.nombreUbicacion}</option>
                  ))
                }
              </select>
              <label className='addProduct__title'>Categoria:</label>
              <select name="idCategoria" className='addProduct__input' placeholder='Seleccione una categoria' onChange={handleChange}>
                <option value={"vacio"} className={"addProduct__option"}>Seleccione una categoria</option>
                {
                  categoryListProduct.map((cat) => (
                    <option key={cat.idCategoria} value={cat.idCategoria} className={"addProduct__option"}>{cat.nombreCategoria}</option>
                  ))
                }
              </select>
              <button type="text" className='addProduct__btn' onClick={addProduct}>Registrar</button>
            </div>
          </div>
          <div className='spaceProduct'>
          </div>
      </div>   
    </div>
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default AddProduct