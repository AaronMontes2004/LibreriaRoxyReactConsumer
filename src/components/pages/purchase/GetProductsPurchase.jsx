import React, { useContext } from 'react'
import { PurchaseContext } from '../../contexts/purchase/PurchaseState'

const GetProductsPurchase = () => {

    const { productsPurchase, functionAddedProductPurchase } = useContext(PurchaseContext)

  return (
    <>
        <table className="searchProductPurchase__table">
            <thead className='searchProductPurchase__thead'>
                <tr className="searchProductPurchase__headrow">
                    <th className='searchProductPurchase__headcolumn' style={{width: "15%"}}>Id</th>
                    <th className='searchProductPurchase__headcolumn' style={{width: "60%"}}>Nombre</th>
                    <th className='searchProductPurchase__headcolumn' style={{width: "25%"}}>Opciones</th>
                </tr>
            </thead>
            <tbody className='searchProductPurchase__tbody'>
                {
                    productsPurchase.map((p, i) =>
                        (
                            <tr key={p.idProducto} className="searchProductPurchase__bodyrow">
                                <td className='searchProductPurchase__bodycolumn'>{i+1}</td>
                                <td title={p.nombreProducto}    className='searchProductPurchase__bodycolumn searchProductPurchase__bodycolumn--long'>{p.nombreProducto}</td>
                                <td className='searchProductPurchase__bodycolumn'>
                                    <button className='searchProductPurchase__btnadd' onClick={() => {functionAddedProductPurchase(p)}}>Agregar</button>
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    </>
  )
}

export default GetProductsPurchase