import React from 'react'
import "../../assets/css/modals/messageModal.css";

const MessageModal = ({status, message, activeModal}) => {
  return (
    <>
        <div className={!activeModal ? "modalMessage" : "modalMessage modalMessage__container--show"}> 
        <div className='modalMessage__container'>
            <img src={status === "FAILED" ? "img/warning.png" : (status === "DANGER" ? "img/danger.png" : "img/success.png")} alt="" className='modalMessage__img'/>
            <p className='modalMessage__text'>{message}</p>
        </div>
        </div>
    </>
  )
}

export default MessageModal