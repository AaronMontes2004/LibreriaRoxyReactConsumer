import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';

export const CategoryContext = createContext();

const CategoryState = (props) => {

  const [pageStatus, setPageStatus] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const [editCategory, setEditCategory] = useState({});

  useEffect(() => {
    const listCategories = async () => {
      const categories = await request.get("category");
      setCategoryList(categories.data.data);
    }

    listCategories();
  }, [pageStatus])

  return (
    <CategoryContext.Provider value={{
        data: categoryList,
        setPageStatus: setPageStatus,
        pageStatus: pageStatus,
        editCategory: editCategory,
        setEditCategory: setEditCategory
    }}>
        { props.children }
        <Outlet/>
    </CategoryContext.Provider>
  )
}

export default CategoryState;