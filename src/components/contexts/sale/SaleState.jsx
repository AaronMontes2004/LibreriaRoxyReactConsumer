import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';
import MessageModal from '../../modal/MessageModal';

export const SaleContext = createContext();

const SaleState = (props) => {

  const [dateSale, setDateSale] = useState(new Date().toLocaleString());
  const [priceDataSale, setPriceDataSale] = useState({
    priceSale: 0,
    discountSale: 0,
    totalPaySale: 0
  });

  const [statusPrice, setStatusPrice] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [productsSale, setProductsSale] = useState([])

  const [sales, setSales] = useState([]);
  const [statusSales, setStatusSales] = useState(false);

  const [ productSalesList, setProductSalesList ] = useState([]);

  const [pageStatus, setPageStatus] = useState(false);


/*   const [saleModel, setSaleModel] = useState({
    fechaVenta: 
  });
 */
  const [activeModal, setActiveModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const modifyPrices = () => {
    let sumPrice = 0;

    productSalesList.map((p) => {
      sumPrice += parseFloat(p.precioPedido)
    });

    let totalPrice = sumPrice - parseFloat(priceDataSale.discountSale);

    setPriceDataSale({
      ...priceDataSale,
      ["priceSale"]: sumPrice.toFixed(2),
      ["totalPaySale"]: totalPrice.toFixed(2)
    })
  }

  const addProductList = (p) => {

    for (let index = 0; index < productSalesList.length; index++) {
      if (productSalesList[index].idProducto === p.idProducto){
        console.log("El producto ya está seleccionado");
        return;
      }
    }

    p.kindMeasure = "und";  
    p.cantidadPedido = 1;
    p.precioPedido = p.precioVProducto;
    productSalesList.push(p);
    setProductSalesList([...productSalesList]);

    modifyPrices();
  }

  const handleChangePrice = (value, idProducto) => {

    productSalesList.map((p) => {
      if (p.idProducto === idProducto ){
        p.cantidadPedido = value;
        if(p.kindMeasure === "und" || p.kindMeasure === ""){
          p.precioPedido = value * p.precioVProducto;
        } else {
          p.precioPedido = value * p.precioMedida;
        }
      }
    })

   /*  productSalesList[index].cantidadPedido = value;
    if(productSalesList[index].kindMeasure === "und" || productSalesList[index].kindMeasure === ""){
      productSalesList[index].precioPedido = value * productSalesList[index].precioVProducto;
    } else {
      productSalesList[index].precioPedido = value * productSalesList[index].precioMedida;
    } */
    setProductSalesList([...productSalesList])

    /* let sumPrice = 0;

    productSalesList.map((p) => {
      sumPrice += p.precioPedido
    });

    let totalPrice = sumPrice - priceDataSale.discountSale;

    setPriceDataSale({
      ...priceDataSale,
      ["priceSale"]: sumPrice,
      ["totalPaySale"]: totalPrice
    }) */

    modifyPrices();
  }

  const deleteProductList = async (idProducto) => {
    console.log("ID: ", idProducto);
    const newProductSalesList = productSalesList.filter((p) => {
      return p.idProducto != idProducto;
    })

    let sumPrice = 0;

    newProductSalesList.map((p) => {
      sumPrice += parseFloat(p.precioPedido)
    });

    let totalPrice = sumPrice - parseFloat(priceDataSale.discountSale);

    setPriceDataSale({
      ...priceDataSale,
      ["priceSale"]: sumPrice.toFixed(2),
      ["totalPaySale"]: totalPrice.toFixed(2)
    })

    setProductSalesList([...newProductSalesList])
    
    /* modifyPrices(); */
    /* setProductSalesList([...newProductSalesList]); */
  }

  const handleChangeKindMeasure = (value, idProducto) => {
    
    productSalesList.map((p) => {
      if (p.idProducto == idProducto){
        p.kindMeasure = value;
    /* setProductSalesList([...productSalesList]) */
        if(value === "und" || value === ""){
          p.precioPedido = p.cantidadPedido * parseFloat(p.precioVProducto);
        } else {
          p.precioPedido = p.cantidadPedido * parseFloat(p.precioMedida);
        }
      }
    })

    setProductSalesList([...productSalesList])

    modifyPrices();
  }

  const handleChangePriceSale = (value) => {
    if (value === ""){
      setPriceDataSale({
        ...priceDataSale,
        ["priceSale"]: 0
      })
    } else {
      setPriceDataSale({
        ...priceDataSale,
        ["priceSale"]: value
      })
    }

    setStatusPrice(!statusPrice)
  }

  const handleChangeDiscountSale = (value) => {
    if (value === ""){
      setPriceDataSale({
        ...priceDataSale,
        ["discountSale"]: 0
      })
    } else {
      setPriceDataSale({
        ...priceDataSale,
        ["discountSale"]: value
      })
    }

    setStatusPrice(!statusPrice)
  }

  const functionAddSale = async () => {
    if (dateSale === "" || dateSale === null || dateSale === undefined){
      setStatus("FAILED")
      setMessage("Debe seleccionar la fecha de la respectiva venta")
      setActiveModal(true);
      setTimeout(() => {
        setActiveModal(false)
      }, 1750)
      return;
    }

    if(productSalesList.length === 0 ){
      setStatus("FAILED")
      setMessage("Debe seleccionar al menos un producto")
      setActiveModal(true);
      setTimeout(() => {
        setActiveModal(false)
      }, 1750)
      return;
    }

    if (priceDataSale.priceSale === "" || priceDataSale.priceSale === null || priceDataSale.priceSale === undefined){
      setStatus("FAILED")
      setMessage("El precio total no puede estar vacio")
      setActiveModal(true);
      setTimeout(() => {
        setActiveModal(false)
      }, 1750)
      return;
    }

    if (priceDataSale.priceSale < 1){
      setStatus("FAILED")
      setMessage("El precio total no puede ser menor a S/1.00")
      setActiveModal(true);
      setTimeout(() => {
        setActiveModal(false)
      }, 1750)
      return;
    }

    const addedSale = await request.post("sale", {
      fechaVenta: dateSale,
      totalVenta: priceDataSale.totalPaySale
    });

    const addedTicket = await request.post("ticket",{
      subtotalBoleta: priceDataSale.priceSale,
      descuentoBoleta: priceDataSale.discountSale,
      totalPagarBoleta: priceDataSale.totalPaySale
    })

    productSalesList.map(async(p) => {
      const addedSaleDetai = await request.post("sale-detail",{
        cantidadVenta: p.cantidadPedido,
        cantidadTipo: p.kindMeasure,
        precioUnitario: p.kindMeasure === "und" ? p.precioVProducto : p.precioMedida,
        totalVentaIndividual: p.precioPedido,
        idProducto: p.idProducto,
        idBoleta: addedTicket.data.data.insertId,
        idVenta: addedSale.data.data.insertId
      });
      console.log("SALE DETAIL: ", addedSaleDetai);
    })

    setStatus("OK")
    setMessage("Se registró la venta exitosamente")
    setActiveModal(true);
    setTimeout(() => {
      setActiveModal(false)
      setProductSalesList([]);
      setPriceDataSale({
        priceSale: 0,
        discountSale: 0,
        totalPaySale: 0
      })
      setPageStatus(!pageStatus)
    }, 1750)
    return;
  }

  const functionGetSales = async () => {
    const listSales = await request.get("sale");

    setSales(listSales.data.data);
  }

  useEffect(() => {
    const getProductsSale = async () => {
      if (searchText === null || searchText === "" || searchText === undefined){
        const products = await request.get("product/enabled");
        setProductsSale(products.data.data)
        return;
      } else {
        const products = await request.get("product/findByName/enabled/"+searchText)
        setProductsSale(products.data.data);
        return;
      }
    }
    getProductsSale();
  }, [searchText])

  useEffect(() => {

    let total = parseFloat(priceDataSale.priceSale) - parseFloat(priceDataSale.discountSale);

    setPriceDataSale({
      ...priceDataSale,
      ["totalPaySale"]: total
    })

    console.log("AQUI");
  }, [statusPrice])

  useEffect(() => {
    functionGetSales();
  }, [pageStatus])

  /* useEffect(() => {
    console.log("Producto registrado", productSalesList);
    console.log("Producto modificado", productSalesList);
  }, [productSalesList]) */

  return (
    <>
        <SaleContext.Provider value={{
          searchText: searchText,
          setSearchText: setSearchText,
          pageStatus: pageStatus,
          setPageStatus: setPageStatus,
          productsSale: productsSale,
          setProductsSale: setProductsSale,
          dateSale: dateSale,
          setDateSale: setDateSale,
          addProductList: addProductList,
          productSalesList: productSalesList,
          deleteProductList: deleteProductList,
          handleChangePrice: handleChangePrice,
          priceDataSale: priceDataSale,
          handleChangeKindMeasure: handleChangeKindMeasure,
          handleChangePriceSale: handleChangePriceSale,
          handleChangeDiscountSale: handleChangeDiscountSale,
          functionAddSale: functionAddSale,
          sales: sales
        }}>
            {props.children}
            <Outlet/>
            <MessageModal message={message} status={status} activeModal={activeModal} />
        </SaleContext.Provider>
    </>
  )
}

export default SaleState