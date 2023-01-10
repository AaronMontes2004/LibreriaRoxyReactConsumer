import React, { useContext, useState } from 'react'
import { CategoryContext } from '../../contexts/category/CategoryState'
import { GlobalContext } from '../../contexts/GlobalState';
import "../../../assets/css/category/category.css";
import { request } from '../../libs/urlConsumer';
import EditCategory from './EditCategory';

const GetCategory = () => {

  const {data, pageStatus, setPageStatus, setEditCategory} = useContext(CategoryContext)
  const [activeEditCategory, setActiveEditCategory] = useState(false);
  const functionChangeStatus = async (id) => {
    const res = await request.put("category/changeStatus/"+id);
    setPageStatus(!pageStatus);
    console.log(res);
  }

  const openEditCategory = (c) => {
    setActiveEditCategory(true);
    setEditCategory(c)
    console.log(c);
  }

  return (
    <>
    <div className='getCategory'>
      <table className='getCategory__table'>
        <thead className='getCategory__head'>
          <tr className='getCategory__headrow'>
            <th className='getCategory__headcolumn'>Id</th>
            <th className='getCategory__headcolumn'>Nombre</th>
            <th className='getCategory__headcolumn'>Estado</th>
            <th className='getCategory__headcolumn'>Opciones</th>
          </tr>
        </thead>
        <tbody className='getCategory__body'>
          {
            data.map((c, i) => (
            <tr key={c.idCategoria} className={!c.estadoCategoria ? 'getCategory__bodyrow getCategory__bodyrow--disabled': 'getCategory__bodyrow'}>
              <td className='getCategory__bodycolumn'>{i+1}</td>
              <td className='getCategory__bodycolumn'>{c.nombreCategoria}</td>
              <td className='getCategory__bodycolumn'>
                <input onChange={() => functionChangeStatus(c.idCategoria)} defaultChecked={c.estadoCategoria ? true : false} type="checkbox" className='getCategory__bodycheck'/>
              </td>
              <td className='getCategory__bodycolumn'>
                <button disabled={!c.estadoCategoria ? true : false} className='getCategory__bodybtn' onClick={() => {openEditCategory(c)}}>Editar</button>
              </td>
          </tr>))
          }
        </tbody>
      </table>
      <div className='spaceCategory'>
      </div>
    </div>
      <EditCategory activeEditCategory={activeEditCategory} setActiveEditCategory={setActiveEditCategory}/>
    </>
  )
}

export default GetCategory