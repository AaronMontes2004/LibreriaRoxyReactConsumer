import React, { useContext } from 'react'
import { SaleContext } from '../../contexts/sale/SaleState';

const ListProductsSale = () => {

    const { deleteProductList, productSalesList, handleChangePrice } = useContext(SaleContext);

  return (
    <>
        <div className="listProductsSale">
            {
                productSalesList.length === 0 ? (
                    <h1>NO HAY PRODUCTOS</h1>
                ) : (
                    productSalesList.map((p, i) => (
                        <div key={i+1} className="listProductsSale__card">
                            <div className="listProductsSale__nameProduct">
                                <p title={p.nombreProducto} className='listProductsSale__nameProduct--text'>{p.nombreProducto}</p>
                            </div>
                            <div className="listProductsSale__cantidadProduct">
                                <input min={1} defaultValue={1} type="number" className='listProductsSale__cantidadProduct--input' onChange={(e) => {handleChangePrice(e.target.value, i)}}/>
                            </div>
                            <div className="listProductsSale__tipoMedida">
                                <select defaultValue={null} name="tipoMedida" id="" className='listProductsSale__tipoMedida--select'>
                                    <option value={null}>UND</option>
                                    {p.tipoMedida === "CM" || p.tipoMedida === "cm" ? <option value="cm">CM</option> : ""}
                                    {p.tipoMedida === "M" || p.tipoMedida === "m" ? <option value="m">M</option> : ""}
                                </select>
                            </div>
                            <div className="listProductsSale__precioProduct">
                                <p className='listProductsSale__nameProduct--text'>{p.precioPedido}</p>
                            </div>
                            <div className="listProductsSale__btn">
                                <button className='listProductsSale__btn--delete' onClick={() =>{deleteProductList(i)}}>
                                    <img src="icons/trash.svg" className='listProductsSale__icon' alt="" />
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

export default ListProductsSale