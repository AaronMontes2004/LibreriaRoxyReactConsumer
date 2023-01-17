import React, { useContext } from 'react'
import { PurchaseContext } from '../../contexts/purchase/PurchaseState'
import GetProductsPurchase from './GetProductsPurchase'

const SearchProductsPurchase = () => {

    const { setSearchText } = useContext(PurchaseContext)

    const handleChange = (e) => {
        setSearchText(e.target.value);
        console.log(e.target.value);
    }

  return (
    <>
        <div className='searchProductPurchase'>
            <div className="searchProductPurchase__searchProduct">
                <label className='searchProductPurchase__label'>Nombre del producto:</label>
                <input type="text" placeholder='Ingrese el nombre del producto' className='searchProductPurchase__input' onChange={handleChange}/> 
            </div>
            <GetProductsPurchase/>
            <div className="spaceAddPurchase">
            </div>
        </div>
    </>
  )
}

export default SearchProductsPurchase