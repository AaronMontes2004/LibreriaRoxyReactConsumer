import React, { useContext, useState } from 'react'
import { ProductContext } from '../../contexts/product/ProductState';
import MessageModal from '../../modal/MessageModal';
import "../../../assets/css/product/editProduct.css"
import { request } from '../../libs/urlConsumer';

const EditProduct = ({activeEditProduct, setActiveEditProduct}) => {

    const { setPageStatus, pageStatus, editProduct, setEditProduct, locationListProduct, categoryListProduct } = useContext(ProductContext);

    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEditProduct({
            ...editProduct,
            [e.target.name]: e.target.value
        })
    }

    const functionEditProduct = async () => {
        try {

            const res = await request.put("product/"+editProduct.idProducto, {
                nombreProducto: editProduct.nombreProducto,
                descripcionProducto: editProduct.descripcionProducto,
                stockProducto: editProduct.stockProducto,
                precioCProducto: editProduct.precioCProducto,
                precioVProducto: editProduct.precioVProducto,
                idUbicacion: editProduct.idUbicacion,
                idCategoria: editProduct.idCategoria
              });
          
              setActiveModal(true);
              setStatus(res.data.status);
              setMessage(res.data.message);
              setTimeout(() => {
                setActiveModal(false);
                if (res.data.status === "OK"){
                  setActiveEditProduct(false);
                }
              }, 1750);
              setPageStatus(!pageStatus);
            
        } catch (error) {
            console.log(error);
            setActiveModal(true);
            setStatus("DANGER");
            setMessage("Error interno en el servidor, intentelo mas tarde");
            setTimeout(() => {
              setActiveModal(false);
              setActiveEditProduct(false);
            }, 1750);
        }
    }

    const functionCancel = () => {
        setActiveEditProduct(false);
    }

  return (
    <>
    <div className={!activeEditProduct ? 'editProduct' : 'editProduct editProduct--show'}>
        <div className="editProduct__form">
          <div className='editProduct__container'>
            <label className='editProduct__title'>Nombre:</label>
            <input value={editProduct.nombreProducto || ""} name="nombreProducto" type="text" placeholder='Ingrese un nombre para el producto' className='editProduct__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProduct__title'>Descripción:</label>
            <input value={editProduct.descripcionProducto || ""} name="descripcionProducto" type="text" placeholder='Ingrese una descripción para el producto' className='editProduct__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProduct__title'>Stock:</label>
            <input value={editProduct.stockProducto || ""} name="stockProducto" type="text" placeholder='Ingrese el stock del producto' className='editProduct__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProduct__title'>Precio compra:</label>
            <input value={editProduct.precioCProducto || ""} name="precioCProducto" type="text" placeholder='Ingrese el precio de compra del producto' className='editProduct__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProduct__title'>Precio venta:</label>
            <input value={editProduct.precioVProducto || ""} name="precioVProducto" type="text" placeholder='Ingrese el precio de venta del producto' className='editProduct__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProduct__title'>Ubicación::</label>
            <select name='idUbicacion' className='editProduct__input' placeholder='Seleccione una ubicación' onChange={handleChange}>
                <option value={"vacio"}>Seleccione una ubicación</option>
                {
                  locationListProduct.map((loc) => (
                    loc.idUbicacion == editProduct.idUbicacion ? <option key={loc.idUbicacion} value={loc.idUbicacion} className={"addProduct__option"} selected>{loc.nombreUbicacion}</option> :<option key={loc.idUbicacion} value={loc.idUbicacion} className={"addProduct__option"}>{loc.nombreUbicacion}</option> 
                  ))
                }
              </select>
              <label className='editProduct__title'>Categoria:</label>
              <select name="idCategoria" className='editProduct__input' placeholder='Seleccione una categoria' onChange={handleChange}>
                <option value={"vacio"}>Seleccione una categoria</option>
                {
                  categoryListProduct.map((cat) => (
                    cat.idCategoria == editProduct.idCategoria ? <option key={cat.idCategoria} value={cat.idCategoria} className={"addProduct__option"} selected>{cat.nombreCategoria}</option> : <option key={cat.idCategoria} value={cat.idCategoria} className={"addProduct__option"}>{cat.nombreCategoria}</option>
                  ))
                }
              </select>
            <button type="text" className='editProduct__btn' onClick={functionEditProduct}>Guardar</button>
            <button type="text" className='editProduct__btn--cancel' onClick={functionCancel}>Cancel</button>
          </div>
        </div>
    </div>   
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default EditProduct