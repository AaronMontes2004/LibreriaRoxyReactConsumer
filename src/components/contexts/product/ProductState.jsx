import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';

export const ProductContext = createContext();

const ProductState = (props) => {

  const [pageStatus, setPageStatus] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryListProduct, setCategoryListProduct] = useState([]);
  const [locationListProduct, setLocationListProduct] = useState([]);

  const [editProduct, setEditProduct] = useState({});
  
  useEffect(() => {
    const listProduct = async() => {
      const products = await request.get("product");
      setProductList(products.data.data);
    }
    const listCategoriesProduct = async() => {
      const res = await request.get("category/enabled");
      setCategoryListProduct(res.data.data);
    }

    const listLocationsProduct = async() => {
      const res = await request.get("location/enabled");
      setLocationListProduct(res.data.data);
    }
    listCategoriesProduct();
    listLocationsProduct();
    listProduct();
  }, [pageStatus])

  return (
    <ProductContext.Provider value={{
      productList: productList,
      setProductList: setProductList,
      pageStatus: pageStatus,
      setPageStatus: setPageStatus,
      categoryListProduct: categoryListProduct,
      locationListProduct: locationListProduct,
      editProduct: editProduct,
      setEditProduct: setEditProduct
    }}>
        {props.children}
        <Outlet/>
    </ProductContext.Provider>
  )
}

export default ProductState