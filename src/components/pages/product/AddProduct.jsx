import React, { useContext, useEffect, useState } from 'react'
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
    precioVProductoSinIGV: 0,
    precioVProducto: 0,
    idUbicacion: "vacio",
    idCategoria: "vacio"
  });

  const [productMeasures, setProductMeasures] = useState({
    medidaHabilitada: false,
    tipoMedida: "vacio",
    cantidadMaxMedida: 0,
    cantidadMedida: 0,
    precioMedida: 0
  })

  const handleChange = (e) =>{
    if (e.target.name === "precioVProductoSinIGV"){
      let total = 0;

      let valor = parseFloat(e.target.value);

      if (!valor){
        valor = 0;
      }

      const igv = valor * 0.18;
      total = valor + igv;

      setProduct({
        ...product,
        [e.target.name]: e.target.value,
        ["precioVProducto"]: total.toFixed(2)
      })
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleChangeMeasure = (e) => {
    setProductMeasures({
      ...productMeasures,
      [e.target.name]: e.target.value
    })
  }

  const handleClickMeasures= () => {
    if (productMeasures.medidaHabilitada === true){
      setProductMeasures(
        {
          ...productMeasures,
          ["medidaHabilitada"]: false
        }
      )
      return;
    }
    if (productMeasures.medidaHabilitada === false){
      setProductMeasures(
        {
          ...productMeasures,
          ["medidaHabilitada"]: true
        }
      )
      return;
    }
  }

  const addProduct = async () => {
    try {

      if (productMeasures.medidaHabilitada === false){
        const res = await request.post("product/", product);
  
        setActiveModal(true);
        setStatus(res.data.status);
        setMessage(res.data.message);
        setTimeout(() => {
          setActiveModal(false);
          if (res.data.status === "OK"){
            setProduct({
              nombreProducto: "",
              descripcionProducto: "",
              stockProducto: 0,
              precioCProducto: 0,
              precioVProducto: 0,
              idUbicacion: "vacio",
              idCategoria: "vacio"
            })
    
            setProductMeasures({
              medidaHabilitada: false,
              tipoMedida: "und",
              cantidadMaxMedida: 0,
              cantidadMedida: 0,
              precioMedida: 0
            })
            setPageStatus(!pageStatus);
          }
        }, 1750);

        return;
      }

      if (productMeasures.medidaHabilitada === true){

        if (productMeasures.tipoMedida === "vacio" || productMeasures.tipoMedida === ""){
          setActiveModal(true);
          setStatus("FAILED");
          setMessage("Debe seleccionar una medida");
          setTimeout(() => {
            setActiveModal(false);
          }, 1750)
          return;
        }
        if (productMeasures.cantidadMaxMedida === "" || productMeasures.cantidadMaxMedida === null){
          setActiveModal(true);
          setStatus("FAILED");
          setMessage("La cantidad máxima no puede estar vacio");
          setTimeout(() => {
            setActiveModal(false);
          }, 1750)
          return;
        }
        
        if (productMeasures.cantidadMaxMedida < 1){
          setActiveModal(true);
          setStatus("FAILED");
          setMessage("La cantidad máxima no puede ser menor a uno");
          setTimeout(() => {
            setActiveModal(false);
          }, 1750)
          return;
        }
        
        if (productMeasures.precioMedida === "" || productMeasures.precioMedida === null){
          setActiveModal(true);
          setStatus("FAILED");
          setMessage("El precio de la medida no puede estar vacio");
          setTimeout(() => {
            setActiveModal(false);
          }, 1750)
          return;
        }
        
        if (productMeasures.precioMedida < 1){
          setActiveModal(true);
          setStatus("FAILED");
          setMessage("El precio de la medida no puede ser menor a uno");
          setTimeout(() => {
            setActiveModal(false);
          }, 1750)
          return;
        }

        const res = await request.post("product/", {...product, ...productMeasures});
  
        setActiveModal(true);
        setStatus(res.data.status);
        setMessage(res.data.message);
        setTimeout(() => {
          setActiveModal(false);
          if (res.data.status === "OK"){
            setProduct({
              nombreProducto: "",
              descripcionProducto: "",
              stockProducto: 0,
              precioCProducto: 0,
              precioVProducto: 0,
              idUbicacion: "vacio",
              idCategoria: "vacio"
            })
    
            setProductMeasures({
              medidaHabilitada: false,
              tipoMedida: "und",
              cantidadMaxMedida: 0,
              cantidadMedida: 0,
              precioMedida: 0
            })
            setPageStatus(!pageStatus);
          }
        }, 1750);

        return;
      }
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

  useEffect(() => {
    console.log(product);
  }, [product])

  return (
    <>
    <div className="menuProduct">
      <h1 className='menuProduct__title'>Registro de producto</h1>
      <div className='addProduct'>
          <div className="addProduct__form">
            <div className='addProduct__container'>
              <label className='addProduct__title'>Nombre:</label>
              <input value={product.nombreProducto} name='nombreProducto' type="text" placeholder='Ingrese un nombre para el producto' className='addProduct__input' onChange={handleChange}/>
              {/* <label className='addProduct__title'>Descripción:</label>
              <input value={product.descripcionProducto} name='descripcionProducto' type="text" placeholder='Ingrese una descripción para el producto' className='addProduct__input' onChange={handleChange}/> */}
              <label className='addProduct__title'>Stock:</label>
              <input value={product.stockProducto} name='stockProducto' type="number" maxLength={4} min={1} max={999} minLength={0} placeholder='Ingrese el stock para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>Precio compra:</label>
              <input value={product?.precioCProducto} name='precioCProducto' type="text" placeholder='Ingrese el precio de compra para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>{"Precio venta (Sin IGV):"}</label>
              <input value={product.precioVProductoSinIGV} name='precioVProductoSinIGV' type="text" placeholder='Ingrese el precio de venta para el producto' className='addProduct__input' onChange={handleChange}/>
              <label className='addProduct__title'>{"Precio venta (Con IGV):"}</label>
              <input readOnly={true} value={product.precioVProducto} name='precioVProducto' type="text" placeholder='Ingrese el precio de venta para el producto' className='addProduct__input' onChange={handleChange}/>
              <div className='addProduct__miniForm'>
                <div className='addProduct__miniComponent--enabled'>
                  <label className='addProduct__miniTitle'>¿Sale en medidas?</label>
                  <button type="button" className={productMeasures.medidaHabilitada === false ? "addProduct__miniButton addProduct__orange" : "addProduct__miniButton addProduct__red"} onClick={handleClickMeasures}>{productMeasures.medidaHabilitada === false ? "Habilitar" : "Deshabilitar"}</button>
                </div>
                <div className="addProduct__miniComponent--kindMeasure">
                  <label className='addProduct__miniTitle'>Tipo de medida:</label>
                  <select disabled={productMeasures.medidaHabilitada === false ? true : false} className='addProduct__miniSelect' name="tipoMedida" onChange={handleChangeMeasure}>
                    <option value="vacio">Seleccione una medida</option>
                    <option value="cm">Centímetros</option>
                    <option value="m">Metros</option>
                  </select>
                </div>
                <div className="addProduct__miniComponent--maxMeasure">
                  <label className='addProduct__miniTitle'>Cantidad máxima:</label>
                  <input value={productMeasures.cantidadMaxMedida} disabled={productMeasures.medidaHabilitada === false ? true : false}  name='cantidadMaxMedida' placeholder='Ingrese la cantidad máxima' type="text" className='addProduct__miniInput'onChange={handleChangeMeasure} />
                </div>
                <div className="addProduct__miniComponent--priceMeasure">
                  <label className='addProduct__miniTitle'>Precio:</label>
                  <input value={productMeasures.precioMedida} disabled={productMeasures.medidaHabilitada === false ? true : false}  name='precioMedida' placeholder='Ingrese el precio' type="text" className='addProduct__miniInput' onChange={handleChangeMeasure} />
                </div>
              </div>
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