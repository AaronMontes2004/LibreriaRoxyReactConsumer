import React, { useContext, useEffect } from 'react'
import { PurchaseContext } from '../../contexts/purchase/PurchaseState'

const ListProductsPurchase = () => {

    const { listProductsPurchaseAdd, setListProductsPurchaseAdd, functionDeleteProductPurchase, handleChangePrice } = useContext(PurchaseContext)  

  return (
    <>
        <div className="listProductsPurchase">
            {
                listProductsPurchaseAdd.length === 0 ? (
                    <h1>NO HAY PRODUCTOS</h1>
                ) : (
                    listProductsPurchaseAdd.map((p, i) => (
                        <div key={i+1} className="listProductsPurchase__card">
                            <div className="listProductsPurchase__nameProduct">
                                <p title={p.nombreProducto} className='listProductsPurchase__nameProduct--text'>{p.nombreProducto}</p>
                            </div>
                            <div className="listProductsPurchase__cantidadProduct">
                                <input min={1} defaultValue={1} type="number" className='listProductsPurchase__cantidadProduct--input' onChange={(e) => {handleChangePrice(e.target.value, p.idProducto)}}/>
                            </div>
                            <div className="listProductsPurchase__precioProduct">
                                <p className='listProductsPurchase__nameProduct--text'>{p.precioTotalIndividual}</p>
                            </div>
                            <div className="listProductsPurchase__btn">
                                <button className='listProductsPurchase__btn--delete' onClick={() =>{functionDeleteProductPurchase(p.idProducto)}}>
                                    <img src="icons/trash.svg" className='listProductsPurchase__icon' alt="" />
                                </button>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    </>
  )
}

export default ListProductsPurchase