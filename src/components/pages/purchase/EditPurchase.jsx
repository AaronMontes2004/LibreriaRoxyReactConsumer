import React, { useContext, useEffect, useState } from 'react'
import { PurchaseContext } from '../../contexts/purchase/PurchaseState';
import MessageModal from '../../modal/MessageModal';
import "../../../assets/css/purchase/editPurchase.css";
import { request } from '../../libs/urlConsumer';

const EditPurchase = ({activeEditPurchase, setActiveEditPurchase}) => {

    const { editPurchase, setEditPurchase, listProvidersPurchase, pageStatus, setPageStatus, datePurchase, setDatePurchase} = useContext(PurchaseContext)

    const [activeModal, setActiveModal] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEditPurchase({
            ...editPurchase,
            [e.target.name]: e.target.value
        })
        console.log(editPurchase);
    }

    const functionUpdatePurchase = async () => {
      try {
        const updatedPurchase = await request.put("purchase/"+editPurchase.idCompra, editPurchase)
        setActiveModal(true)
        setStatus(updatedPurchase.data.status)
        setMessage(updatedPurchase.data.message)
        setTimeout(() => {
          setActiveModal(false)
          if (updatedPurchase.data.status === "OK"){
            setActiveEditPurchase(false)
          }
        }, 1750)
        setPageStatus(!pageStatus)
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

    const closeEditPurchase = () => {
        setActiveEditPurchase(false)
    }

    const formatDate = (date = "2022-05-21T05:00:00.000Z") => {
        var fecha = new Date(date); //Fecha actual
        var mes = fecha.getMonth()+1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if(dia<10)
        dia='0'+dia; //agrega cero si el menor de 10
        if(mes<10)
        mes='0'+mes
        const formatedDate =  ano + "-" + mes + "-" + dia;
        return formatedDate;
/*         setDatePurchase(formatedDate); */
    }

    useEffect(() => {
      const date = formatDate(editPurchase.fechaCompra || new Date())
      setDatePurchase(date);
    }, [editPurchase.fechaCompra])

    return (
        <>
    <div className={!activeEditPurchase ? 'editPurchase' : 'editPurchase editPurchase--show'}>
        <div className="editPurchase__form">
          <div className='editPurchase__container'>
            <label className='editPurchase__title'>Fecha compra:</label>
            <input defaultValue={datePurchase} name="fechaCompra" type="date" placeholder='Ingrese un nombre para el Purchaseo' className='editPurchase__input' onChange={(e) => {handleChange(e)}}/>
            <label className='editPurchase__title'>Precio total:</label>
            <input value={editPurchase.totalPagar || ""} name="totalPagar" type="text" placeholder='Ingrese un nombre para el Purchaseo' className='editPurchase__input' onChange={(e) => {handleChange(e)}}/>
            
        <label className='editPurchase__title'>Proveedor:</label>
            <select defaultValue={"vacio"} name='idProveedor' className='editPurchase__input' placeholder='Seleccione una ubicación' onChange={handleChange}>
                <option value={"vacio"}>Seleccione una ubicación</option>
                {
                  listProvidersPurchase.map((p) => (
                    p.idProveedor == editPurchase.idProveedor ? <option key={p.idProveedor} value={p.idProveedor} className={"addPurchase__option"} selected>{p.nombreProveedor}</option> :<option key={p.idProveedor} value={p.idProveedor} className={"addPurchase__option"}>{p.nombreProveedor}</option> 
                  ))
                }
              </select>
            <button type="text" className='editPurchase__btn' /* onClick={functionEditPurchase} */ 
            onClick={functionUpdatePurchase} >Guardar</button>
            <button type="text" className='editPurchase__btn--cancel'/*  onClick={functionCancel} */ onClick={closeEditPurchase}>Cancel</button>
          </div>
        </div>
    </div>   
    <MessageModal activeModal={activeModal} status={status} message={message}/>
    </>
    )
}

export default EditPurchase