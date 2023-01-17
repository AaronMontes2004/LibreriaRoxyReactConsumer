import React, { useContext } from 'react'
import { SaleContext } from '../../contexts/sale/SaleState'

const GetProductSale = () => {

    const { productsSale, addProductList /* functionAddedProductSale */ } = useContext(SaleContext)

  return (
    <>
        <table className="searchProductSale__table">
            <thead className='searchProductSale__thead'>
                <tr className="searchProductSale__headrow">
                    <th className='searchProductSale__headcolumn' style={{width: "15%"}}>Id</th>
                    <th className='searchProductSale__headcolumn' style={{width: "60%"}}>Nombre</th>
                    <th className='searchProductSale__headcolumn' style={{width: "25%"}}>Opciones</th>
                </tr>
            </thead>
            <tbody className='searchProductSale__tbody'>
                {
                    productsSale.map((p, i) =>
                        (
                            <tr key={p.idProducto} className="searchProductSale__bodyrow">
                                <td className='searchProductSale__bodycolumn'>{i+1}</td>
                                <td title={p.nombreProducto}    className='searchProductSale__bodycolumn searchProductSale__bodycolumn--long'>{p.nombreProducto}</td>
                                <td className='searchProductSale__bodycolumn'>
                                    <button className='searchProductSale__btnadd' onClick={() => {addProductList(p)}}>Agregar</button>
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

export default GetProductSale