import React, { useContext } from 'react'
import { SaleContext } from '../../contexts/sale/SaleState'

const PriceSale = () => {

    const { priceDataSale, handleChangePriceSale, handleChangeDiscountSale, functionAddSale } = useContext(SaleContext) 

  return (
    <>
        <div className="priceSale">
            <div className="priceSale__container">
                <label className='priceSale__label'>Precio total:</label>
                <input name='precioPagar' value={priceDataSale.priceSale || ""} type="text" className='priceSale__input' placeholder='Ingrese el precio total pagado por lo adquirido' onChange={(e) => {handleChangePriceSale(e.target.value)}} />
                <label className='priceSale__label'>Descuento:</label>
                <input name='descuentoPagar' value={priceDataSale.discountSale || ""} type="text" className='priceSale__input' placeholder='Ingrese el descuento' onChange={(e) => {handleChangeDiscountSale(e.target.value)}} />
                <label className='priceSale__label'>Total a pagar:</label>
                <input name='totalPagar' type="text" className='priceSale__input' value={"S/ " + parseFloat(priceDataSale.totalPaySale).toFixed(2) || ""} readOnly={true} placeholder='Total a pagar' /* onChange={handleChange} */ />
                <button className='priceSale__btn' onClick={functionAddSale}>Registrar</button>
            </div>
        </div>
    </>
  )
}

export default PriceSale