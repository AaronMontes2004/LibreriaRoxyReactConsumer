import React from 'react'
import { Outlet } from 'react-router-dom'
import "../../assets/css/config.css"

const Config = () => {
  return (
    <div className='containerMenu'>
        <Outlet/>
    </div>
  )
}

export default Config