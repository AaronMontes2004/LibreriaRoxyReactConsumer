import React, { useContext } from 'react'
import { SaleContext } from '../../contexts/sale/SaleState'

const PriceSale = () => {

    const {} = useContext(SaleContext)

  return (
    <>
        <div className="priceSale">
            <div className="priceSale__container">
                <label className='priceSale__label'>Precio total:</label>
                <input name='totalPagar' /* value={precioTotal || ""} */ type="text" className='priceSale__input' placeholder='Ingrese el precio total pagado por lo adquirido' /* onChange={handleChange} */ />
                <button className='priceSale__btn' /* onClick={functionAddSale} */>Registrar</button>
            </div>
        </div>
    </>
  )
}

export default PriceSale