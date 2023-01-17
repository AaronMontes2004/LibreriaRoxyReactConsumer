import React, { useContext, useEffect } from 'react'
import { SaleContext } from '../../contexts/sale/SaleState';
import ListProductsSale from './ListProductsSale';
import PriceSale from './PriceSale';

const MakeASale = () => {

  const { setDateSale, dateSale } = useContext(SaleContext);

  const handleChange = (e) => {
    setDateSale(e.target.value);
  }

  useEffect(() => {
    const date = document.getElementById("dateSale");

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
    console.log(dateSale);
  }, [dateSale])

  return (
    <>
      <div className='makeASale'>
        <div className="makeASale__form">
          <label className="makeASale__label">Fecha de venta:</label>
          <input name='fechaCompra' id='dateSale' type="date" className="makeASale__input" onChange={handleChange} />
        </div>
        <ListProductsSale/>
        <PriceSale/>
        {/* <ListProductsSale/>
        <PricePurchese/> */}
        <div className="spaceAddSale">
        </div>
      </div>
    </>
  )
}

export default MakeASale