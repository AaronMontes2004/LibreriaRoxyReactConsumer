import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import "../../../assets/css/category/category.css";
import { CategoryContext } from '../../contexts/category/CategoryState';
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal';

const AddCategory = () => {

  const {pageStatus, setPageStatus} = useContext(CategoryContext);

  const [activeModal, setActiveModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e) =>{
    setCategory(e.target.value);
  }

  const addCategory = async () => {
    try {
      const res = await request.post("category/", {
        nombreCategoria: category.toLowerCase()
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
    <div className='addCategory'>
        <div className="addCategory__form">
          <div className='addCategory__container'>
            <label className='addCategory__title'>Nombre de categoria:</label>
            <input type="text" placeholder='Ingrese un nombre para la categoria' className='addCategory__input' onChange={handleChange}/>
            <button type="text" className='addCategory__btn' onClick={addCategory}>Registrar</button>
          </div>
        </div>
        
    </div>   
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default AddCategory