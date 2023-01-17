import React from 'react'
import "../../../assets/css/purchase/addPurchase.css"
import MakeAPurchase from './MakeAPurchase'
import SearchProductsPurchase from './SearchProductsPurchase'

const AddPurchase = () => {
  return (
    <div className='addPurchase'>
      <h1 className="addPurchase__title">Regitro de compra</h1>
      <div className="addPurchase__container">
        <SearchProductsPurchase/>
        <MakeAPurchase/>
      </div>
    </div>
  )
}

export default AddPurchase