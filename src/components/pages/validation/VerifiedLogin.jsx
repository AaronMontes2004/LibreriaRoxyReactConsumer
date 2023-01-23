import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';

const VerifiedLogin = () => {

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
  })

  return (
    <>
        <Outlet/>
    </>
  )
}

export default VerifiedLogin