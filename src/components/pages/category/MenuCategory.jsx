import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../../assets/css/category/category.css";
import { request } from '../../libs/urlConsumer';
import AddCategory from './AddCategory';
import GetCategory from './GetCategory';

const MenuCategory = () => {

  const navigateLogin = useNavigate();

  const validationLogin = async () => {
    const user = window.localStorage.getItem("UserLogin");
    if (!user) {
      navigateLogin("/login")
    }

    const data = await request.post("user/verifyToken", {
      token: (JSON.parse(user))?.token
    })

    console.log(data.data);

    if (data?.data?.status === "FAILED"){
      window.localStorage.removeItem("UserLogin");
      navigateLogin("/login");
    }

    if (data?.data?.status === "DANGER"){
      navigateLogin("/login")
    }

  }

  useEffect(() => {
    validationLogin();
  }, [])

  return (
    <>
        <div className='menuCategory'>
            <h1 className='menuCategory__title'>Registro y consulta de categoria</h1>
            <div className='menuCategory__container'>
                <AddCategory/>
                <GetCategory/>
            </div>
        </div>
    </>
  )
}

export default MenuCategory