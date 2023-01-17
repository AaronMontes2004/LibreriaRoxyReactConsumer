import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';

export const SaleContext = createContext();

const SaleState = (props) => {

  const [dateSale, setDateSale] = useState(new Date().toLocaleString());
  const [precioTotal, setPrecioTotal] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [productsSale, setProductsSale] = useState([])

  const [ productSalesList, setProductSalesList ] = useState([]);

  const [pageStatus, setPageStatus] = useState(false);


/*   const [saleModel, setSaleModel] = useState({
    fechaVenta: 
  });
 */
  const [activeModal, setActiveModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const addProductList = (p) => {
    p.cantidadPedido = 1;
    p.precioPedido = p.precioVProducto;
    productSalesList.push(p);
    setProductSalesList([...productSalesList]);
  }

  const handleChangePrice = (value, index) => {
    productSalesList[index].cantidadPedido = value;
    productSalesList[index].precioPedido = value * productSalesList[index].precioVProducto;
    setProductSalesList([...productSalesList])
  }

  const deleteProductList = (index) => {
    const newProductSalesList = productSalesList.filter((p,i) => {
      return i != index;
    })

    setProductSalesList([...newProductSalesList])

    console.log("NUEVO ARRAY ", newProductSalesList);

    /* setProductSalesList([...newProductSalesList]); */
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
    console.log("Producto registrado", productSalesList);
    console.log("Producto modificado", productSalesList);
  }, [productSalesList])

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
          handleChangePrice: handleChangePrice
        }}>
            {props.children}
            <Outlet/>
        </SaleContext.Provider>
    </>
  )
}

export default SaleState