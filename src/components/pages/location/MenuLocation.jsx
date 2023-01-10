import React from 'react'
import AddLocation from './AddLocation'
import GetLocation from './GetLocation'

const MenuLocation = () => {
  return (
    <>
      <div className='menuLocation'>
            <h1 className='menuLocation__title'>Registro y consulta de ubicaciones</h1>
            <div className='menuLocation__container'>
              <AddLocation/>
              <GetLocation/>
            </div>
        </div>
    </>
  )
}

export default MenuLocation