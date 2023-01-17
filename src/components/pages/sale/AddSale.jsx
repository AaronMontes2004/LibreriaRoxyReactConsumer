import React from 'react'
import MakeASale from './MakeASale'
import SearchProductsSale from './SearchProductsSale'
import "../../../assets/css/sale/addSale.css"

const AddSale = () => {
  return (
    <div className='addSale'>
      <h1 className="addSale__title">Regitro de venta</h1>
      <div className="addSale__container">
        <SearchProductsSale/>
        <MakeASale/>
      </div>
    </div>
  )
}

export default AddSale