import React from 'react'
import "../../assets/css/modals/messageModal.css";
import warning from "../../assets/img/warning.png";
import danger from "../../assets/img/danger.png"
import success from "../../assets/img/success.png"

const MessageModal = ({status, message, activeModal}) => {
  return (
    <>
        <div className={!activeModal ? "modalMessage" : "modalMessage modalMessage__container--show"}> 
        <div className='modalMessage__container'>
            <img src={status === "FAILED" ? warning : (status === "DANGER" ? danger : success)} alt="" className='modalMessage__img'/>
            <p className='modalMessage__text'>{message}</p>
        </div>
        </div>
    </>
  )
}

export default MessageModal