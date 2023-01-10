import React, { useContext, useState } from 'react'
import { ProviderContext } from '../../contexts/provider/ProviderState';
import MessageModal from '../../modal/MessageModal';
import "../../../assets/css/provider/editProvider.css"
import { request } from '../../libs/urlConsumer';

const EditProvider = ({activeEditProvider, setActiveEditProvider}) => {

    const { setPageStatus, pageStatus, editProvider, setEditProvider } = useContext(ProviderContext);

    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEditProvider({
            ...editProvider,
            [e.target.name]: e.target.value
        })
    }

    const funtionEditProvider = async () => {
        try {

            const res = await request.put("provider/"+editProvider.idProveedor, {
                nombreProveedor: editProvider.nombreProveedor,
                telefonoProveedor: editProvider.telefonoProveedor,
                direccionProveedor: editProvider.direccionProveedor,
                emailProveedor: editProvider.emailProveedor
              });
          
              setActiveModal(true);
              setStatus(res.data.status);
              setMessage(res.data.message);
              setTimeout(() => {
                setActiveModal(false);
                if (res.data.status === "OK"){
                  setActiveEditProvider(false);
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
              setActiveEditProvider(false);
            }, 1750);
        }
    }

    const functionCancel = () => {
        setActiveEditProvider(false);
    }

  return (
    <>
    <div className={!activeEditProvider ? 'editProvider' : 'editProvider editProvider--show'}>
        <div className="editProvider__form">
          <div className='editProvider__container'>
            <label className='editProvider__title'>Nombre:</label>
            <input value={editProvider.nombreProveedor || ""} name="nombreProveedor" type="text" placeholder='Ingrese un nombre para la categoria' className='editProvider__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProvider__title'>Telefono:</label>
            <input value={editProvider.telefonoProveedor || ""} name="telefonoProveedor" type="text" placeholder='Ingrese el telefono del proveedor' className='editProvider__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProvider__title'>Dirección:</label>
            <input value={editProvider.direccionProveedor || ""} name="direccionProveedor" type="text" placeholder='Ingrese un nombre para la categoria' className='editProvider__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editProvider__title'>Correo electrónico:</label>
            <input value={editProvider.emailProveedor || ""} name="emailProveedor" type="text" placeholder='Ingrese el correo electrónico del proveedor' className='editProvider__input' onChange={(e) => {handleChange(e)}}/>
            <button type="text" className='editProvider__btn' onClick={funtionEditProvider}>Guardar</button>
            <button type="text" className='editProvider__btn--cancel' onClick={functionCancel}>Cancel</button>
          </div>
        </div>
    </div>   
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default EditProvider