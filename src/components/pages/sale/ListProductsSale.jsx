import React, { useContext } from 'react'
import { SaleContext } from '../../contexts/sale/SaleState';

const ListProductsSale = () => {

    const { deleteProductList, productSalesList, handleChangePrice, handleChangeKindMeasure } = useContext(SaleContext);

  return (
    <>
        <div className="listProductsSale">
            {
                productSalesList.length === 0 ? (
                    <h1>NO HAY PRODUCTOS</h1>
                ) : (
                    productSalesList.map((p, i) => (
                        <div key={i} className="listProductsSale__card">
                            <div className="listProductsSale__nameProduct">
                                <p title={p.nombreProducto} className='listProductsSale__nameProduct--text'>{p.nombreProducto}</p>
                            </div>
                            <div className="listProductsSale__cantidadProduct">
                                <input min={1} type="number" 
                                defaultValue={1}
                               /*  value={p.cantidadPedido} */
                                className='listProductsSale__cantidadProduct--input' onChange={(e) => {handleChangePrice(e.target.value, p.idProducto)}}/>
                            </div>
                            <div className="listProductsSale__tipoMedida">
                                <select defaultValue="und" name="tipoMedida" id="" className='listProductsSale__tipoMedida--select' onChange={(e)=>{
                                    handleChangeKindMeasure(e.target.value, p.idProducto)
                                }}>
                                    <option value="und">UND</option>
                                    {p.tipoMedida === "CM" || p.tipoMedida === "cm" ? <option value="cm">CM</option> : ""}
                                    {p.tipoMedida === "M" || p.tipoMedida === "m" ? <option value="m">M</option> : ""}
                                </select>
                            </div>
                            <div className="listProductsSale__precioProduct">
                                <p className='listProductsSale__nameProduct--text'>{"S/ "+parseFloat(p?.precioPedido).toFixed(2)}</p>
                            </div> 
                            <div className="listProductsSale__btn">
                                <button className='listProductsSale__btn--delete' onClick={() =>{deleteProductList(p.idProducto)}}>
                                    <img src="icons/trash.svg" className='listProductsSale__icon' alt="trash" />
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