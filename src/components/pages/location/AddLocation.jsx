import React, { useContext, useState } from 'react'
import { LocationContext } from '../../contexts/location/LocationState';
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal';

const AddLocation = () => {

  const {pageStatus, setPageStatus} = useContext(LocationContext);

  const [activeModal, setActiveModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  const handleChange = (e) =>{
    setLocation(e.target.value);
  }

  const addLocation = async () => {
    try {
      const res = await request.post("location/", {
        nombreUbicacion: location.toUpperCase()
      });
  
      setActiveModal(true);
      setStatus(res.data.status);
      setMessage(res.data.message);
      setTimeout(() => {
        setActiveModal(false);
      }, 1750);
      setPageStatus(!pageStatus);
    } catch (error) {
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
    <div className='addLocation'>
        <div className="addLocation__form">
          <div className='addLocation__container'>
            <label className='addLocation__title'>Nombre de ubicación:</label>
            <input type="text" placeholder='Ingrese un nombre para la ubicación' className='addLocation__input' onChange={handleChange}/>
            <button type="text" className='addLocation__btn' onClick={addLocation}>Registrar</button>
          </div>
        </div>
    </div>   
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default AddLocation