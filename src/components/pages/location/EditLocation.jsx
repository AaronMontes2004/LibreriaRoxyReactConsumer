import React, { useContext, useState } from 'react'
import { LocationContext } from '../../contexts/location/LocationState';
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal'
import "../../../assets/css/location/editLocation.css";

const EditLocation = ({activeEditLocation, setActiveEditLocation}) => {

    const { setPageStatus, pageStatus, editLocation, setEditLocation } = useContext(LocationContext);

    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEditLocation({
            ...editLocation,
            [e.target.name]: e.target.value
        })
    }

    const funtionEditLocation = async () => {
        try {

            const res = await request.put("location/"+editLocation.idUbicacion, {
                nombreUbicacion: editLocation.nombreUbicacion.toLowerCase()
              });
          
              setActiveModal(true);
              setStatus(res.data.status);
              setMessage(res.data.message);
              setTimeout(() => {
                setActiveModal(false);
                if (res.data.status === "OK"){
                  setActiveEditLocation(false);
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
              setActiveEditLocation(false);
            }, 1750);
        }
    }

    const functionCancel = () => {
        setActiveEditLocation(false);
    }

  return (
    <>
    <div className={!activeEditLocation ? 'editLocation' : 'editLocation editLocation--show'}>
        <div className="editLocation__form">
          <div className='editLocation__container'>
            <label className='editLocation__title'>Nombre de categoria:</label>
            <input value={editLocation.nombreUbicacion || ""} name="nombreUbicacion" type="text" placeholder='Ingrese un nombre para la categoria' className='editLocation__input' onChange={(e) => {handleChange(e)}}/>
            <button type="text" className='editLocation__btn' onClick={funtionEditLocation}>Guardar</button>
            <button type="text" className='editLocation__btn--cancel' onClick={functionCancel}>Cancel</button>
          </div>
        </div>
    </div>   
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default EditLocation