import React, { useEffect, useState } from 'react'
import "./../../assets/css/welcome.css"
import icon from "./../../assets/img/buho.png";

const Welcome = () => {

    const [nameShowUser, setNameShowUser] = useState("");

    useEffect(() => {
        const showUser = async () => {
            let user = JSON.parse(window.localStorage.getItem("UserLogin"))
            let name = user?.nombreUsuario;
            let lastname = user?.apellidoUsuario
            setNameShowUser(user.nombreUsuario + " " + user.apellidoUsuario)
        }

        showUser();
    }, [])

  return (
    <div className="welcome">
         <h1 className="welcome__title">{"Bienvenido(a)"}</h1>
         <div className="welcome__picture">
            <img className='welcome__img' src={icon} alt="Buho" />
         </div>
         <h1 className='welcome__name'>{nameShowUser || "Anónimo"}</h1>
    </div>
  )
}

export default Welcome