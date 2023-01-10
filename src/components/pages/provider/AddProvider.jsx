import React, { useContext, useState } from 'react'
import { ProviderContext } from '../../contexts/provider/ProviderState';
import MessageModal from '../../modal/MessageModal';
import "../../../assets/css/provider/addProvider.css"
import { request } from '../../libs/urlConsumer';

const AddProvider = () => {

  const { pageStatus, setPageStatus } = useContext(ProviderContext);

  const [activeModal, setActiveModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState({
    nombreProveedor: "",
    telefonoProveedor: 0,
    direccionProveedor: "",
    emailProveedor: "",
  });

  const handleChange = (e) =>{
    setProvider({
      ...provider,
      [e.target.name]: e.target.value
    });
  }

  const addProvider = async () => {
    try {
      const res = await request.post("provider", provider);
  
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
    <div className="menuProvider">
      <h1 className='menuProvider__title'>Registro de proveedor</h1>
      <div className='addProvider'>
          <div className="addProvider__form">
            <div className='addProvider__container'>
              <label className='addProvider__title'>Nombre:</label>
              <input name='nombreProveedor' type="text" placeholder='Ingrese un nombre para el proveedor' className='addProvider__input' onChange={handleChange}/>
              <label className='addProvider__title' >Telefono:</label>
              <input name='telefonoProveedor' type="text" minLength={8} placeholder='Ingrese el telefono del proveedor' className='addProvider__input' onChange={handleChange} required/>
              <label className='addProvider__title'>Dirección:</label>
              <input name='direccionProveedor' type="tel" placeholder='Ingrese la dirección del proveedor' className='addProvider__input' onChange={handleChange}/>
              <label className='addProvider__title'>Correo elextrónico:</label>
              <input name='emailProveedor' type="email" placeholder='Ingrese el correo electrónico del proveedor' className='addProvider__input' onChange={handleChange}/>
              <button type="text" className='addProvider__btn' onClick={addProvider}>Registrar</button>
            </div>
          </div>
          <div className='spaceProvider'>
      </div>
      </div>   
    </div>
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default AddProvider