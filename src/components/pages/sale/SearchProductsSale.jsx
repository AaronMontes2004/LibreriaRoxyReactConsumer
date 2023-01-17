import React, { useContext } from 'react'
import { SaleContext } from '../../contexts/sale/SaleState';
import GetProductSale from './GetProductSale';

const SearchProductsSale = () => {

    const { setSearchText } = useContext(SaleContext)

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

  return (
    <>
        <div className='searchProductSale'>
            <div className="searchProductSale__searchProduct">
                <label className='searchProductSale__label'>Nombre del producto:</label>
                <input type="text" placeholder='Ingrese el nombre del producto' className='searchProductSale__input' onChange={handleChange}/> 
            </div>
            <GetProductSale/>
            <div className="spaceAddSale">
            </div>
        </div>
    </>
  )
}

export default SearchProductsSale