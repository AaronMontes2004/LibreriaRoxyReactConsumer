import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user/UserState';
import "../../../assets/css/user/login.css"
import { Link } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal';

const Login = () => {

  //const context = useContext(UserContext);

  const [activeModal, setActiveModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    usuarioUsuario: "",
    contrasenaUsuario: ""
  });

  const handleChange = (e) => {
    setUser(
      {
        ...user, 
        [e.target.name]: e.target.value
      }
    );
  }

  const funtionLogin = async () => {
    try {
      const data = await request.post("user/login", user);
      console.log(data);
      setStatus(data.data.status);
      setMessage(data.data.message);
      setActiveModal(true)
      setTimeout(() => {
        setActiveModal(false);
        if(data.data.status === "OK"){
          setTimeout(() => {
            console.log("SUCCESS");
          },1000)
        }
      }, 1750);
    } catch (error) {
        console.log(error);
        setStatus("DANGER");
        setMessage("Error interno en el servidor intentalo mas tarde");
        setActiveModal(true)
    }
  }

  return (
    <>
      <div className='login'>
        <div className='login__container'>
          <h1 className='login__title'>Iniciar Sesión</h1>
          <input autoComplete='off' className='login__input' type="text" name='usuarioUsuario' onChange={handleChange} placeholder='Ingrese su usuario'/>
          <input autoComplete='off' className='login__input' type="password" name='contrasenaUsuario' onChange={handleChange} placeholder='Ingrese su contraseña'/>
          <a className='login__button' onClick={funtionLogin}>Iniciar Sesión</a>
          <p className='login__link'>¿Olvidaste tu contraseña? <Link className='login__recover' >Recuperar contraseña</Link></p>
        </div>
      </div>
      <MessageModal activeModal={activeModal} status={status} message={message} />   
    </>
  )
}

export default Login