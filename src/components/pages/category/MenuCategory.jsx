import React, { useContext } from 'react'
import "../../../assets/css/category/category.css";
import AddCategory from './AddCategory';
import GetCategory from './GetCategory';

const MenuCategory = () => {

  return (
    <>
        <div className='menuCategory'>
            <h1 className='menuCategory__title'>Registro y consulta de categoria</h1>
            <div className='menuCategory__container'>
                <AddCategory/>
                <GetCategory/>
            </div>
        </div>
    </>
  )
}

export default MenuCategory