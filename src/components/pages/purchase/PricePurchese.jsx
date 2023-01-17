import React, { useContext } from 'react'
import { PurchaseContext } from '../../contexts/purchase/PurchaseState'

const PricePurchese = () => {

  const { precioTotal, setPrecioTotal, functionAddPurchase } = useContext(PurchaseContext)

  const handleChange = (e) => {
    setPrecioTotal(e.target.value);
  }

  return (
    <>
        <div className="pricePurchese">
            <div className="pricePurchese__container">
                <label className='pricePurchese__label'>Precio total:</label>
                <input name='totalPagar' value={precioTotal || ""} type="text" className='pricePurchese__input' placeholder='Ingrese el precio total pagado por lo adquirido' onChange={handleChange} />
                <button className='pricePurchese__btn' onClick={functionAddPurchase}>Registrar</button>
            </div>
        </div>
    </>
  )
}

export default PricePurchese