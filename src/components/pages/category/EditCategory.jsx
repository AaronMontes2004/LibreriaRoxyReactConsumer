import React, { useContext, useState } from 'react'
import { CategoryContext } from '../../contexts/category/CategoryState';
import MessageModal from '../../modal/MessageModal';
import "../../../assets/css/category/editCategory.css";
import { request } from '../../libs/urlConsumer';

const EditCategory = ({activeEditCategory, setActiveEditCategory}) => {

    const { setPageStatus, pageStatus, editCategory, setEditCategory } = useContext(CategoryContext);

    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEditCategory({
            ...editCategory,
            [e.target.name]: e.target.value
        })
    }

    const functionEditCategory = async() => {
        try {
            const res = await request.put("category/"+editCategory.idCategoria, {
              nombreCategoria: editCategory.nombreCategoria.toLowerCase()
            });
        
            setActiveModal(true);
            setStatus(res.data.status);
            setMessage(res.data.message);
            setTimeout(() => {
              setActiveModal(false);
              if (res.data.status === "OK"){
                setActiveEditCategory(false);
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
              setActiveEditCategory(false);
            }, 1750);
          }
    }

    const functionCancel = () => {
        setActiveEditCategory(false);
    }

  return (
    <>
    <div className={!activeEditCategory ? 'editCategory' : 'editCategory editCategory--show'}>
        <div className="editCategory__form">
          <div className='editCategory__container'>
            <label className='editCategory__title'>Nombre de categoria:</label>
            <input value={editCategory.nombreCategoria || ""} name="nombreCategoria" type="text" placeholder='Ingrese un nombre para la categoria' className='editCategory__input' onChange={(e) => {handleChange(e)}}/>
            <button type="text" className='editCategory__btn' onClick={functionEditCategory}>Guardar</button>
            <button type="text" className='editCategory__btn--cancel' onClick={functionCancel}>Cancel</button>
          </div>
        </div>
    </div>   
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
  )
}

export default EditCategory