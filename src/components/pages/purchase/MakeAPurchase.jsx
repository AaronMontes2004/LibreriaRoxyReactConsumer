import React, { useContext, useEffect } from 'react'
import { PurchaseContext } from '../../contexts/purchase/PurchaseState'
import ListProductsPurchase from './ListProductsPurchase'
import PricePurchese from './PricePurchese'

const MakeAPurchase = () => {

  const { listProvidersPurchase, setDateProviderJSON, dateProviderJSON } = useContext(PurchaseContext);

  const handleChange = (e) => {
    setDateProviderJSON({
      ...dateProviderJSON,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const date = document.getElementById("datePurchase");

    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)
      dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)
      mes='0'+mes

    date.value = ano + "-" + mes + "-" + dia;
  },[])

  useEffect(() => {
    console.log(dateProviderJSON);
  }, [dateProviderJSON])

  return (
    <>
      <div className='makeAPurchase'>
        <div className="makeAPurchase__form">
          <label className='makeAPurchase__label'>Proveedor:</label>
          <select name="idProveedor" className='makeAPurchase__input' onChange={handleChange}>
            <option value="vacio">Seleccione un proveedor</option>
            {
              listProvidersPurchase.map((p) => (
                <option key={p.idProveedor} value={p.idProveedor}>{p.nombreProveedor}</option>
              ))
            }
          </select>
          <label className="makeAPurchase__label">Fecha de compra:</label>
          <input name='fechaCompra' id='datePurchase' type="date" className="makeAPurchase__input" onChange={handleChange} />
        </div>
        <ListProductsPurchase/>
        <PricePurchese/>
        <div className="spaceAddPurchase">
        </div>
      </div>
    </>
  )
}

export default MakeAPurchase