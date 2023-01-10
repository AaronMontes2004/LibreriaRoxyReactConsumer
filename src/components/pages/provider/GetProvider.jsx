import React, { useContext, useState } from 'react'
import { ProviderContext } from '../../contexts/provider/ProviderState';
import "../../../assets/css/provider/getProvider.css"
import { request } from '../../libs/urlConsumer';
import EditProvider from './EditProvider';

const GetProvider = () => {

  const { providerList, pageStatus, setPageStatus, setEditProvider } = useContext(ProviderContext);

  const [activeEditProvider, setActiveEditProvider] = useState(false);

  const functionChangeStatus = async(idProvider) => {
    const res = await request.put("provider/changeStatus/"+idProvider);
    console.log(res.data);
    setPageStatus(!pageStatus);
  }

  const openEditProvider = (c) => {
    setActiveEditProvider(true);
    setEditProvider(c)
    console.log(c);
  }

  return (
    <>
    
    <div className='menuProvider'>
      <div className="menuProvider__container">
        <h1 className='menuProvider__title'>Consulta de proveedores</h1>
        <div className='getProvider'>
        <table className='getProvider__table'>
          <thead className='getProvider__head'>
            <tr className='getProvider__headrow'>
              <th className='getProvider__headcolumn'>Id</th>
              <th className='getProvider__headcolumn'>Nombre</th>
              <th className='getProvider__headcolumn'>Telefono</th>
              <th className='getProvider__headcolumn'>Dirección</th>
              <th className='getProvider__headcolumn'>Correo electrónico</th>
              <th className='getProvider__headcolumn'>Estado</th>
              <th className='getProvider__headcolumn'>Opciones</th>
            </tr>
          </thead>
          <tbody className='getProvider__body'>
            {
              providerList.map((p, i) => (
              <tr key={p.idProveedor} className={!p.estadoProveedor ? 'getProvider__bodyrow getProvider__bodyrow--disabled': 'getProvider__bodyrow'}>
                <td className='getProvider__bodycolumn'>{i+1}</td>
                <td className='getProvider__bodycolumn'>{p.nombreProveedor}</td>
                <td className='getProvider__bodycolumn'>{p.telefonoProveedor}</td>
                <td className='getProvider__bodycolumn'>{p.direccionProveedor || "Sin dirección"}</td>
                <td className='getProvider__bodycolumn'>{p.emailProveedor || "Sin correo elctrónico"}</td>
                <td className='getProvider__bodycolumn'>
                  <input onChange={() => functionChangeStatus(p.idProveedor)} defaultChecked={p.estadoProveedor ? true : false} type="checkbox" className='getProvider__bodycheck'/>
                </td>
                <td className='getProvider__bodycolumn'>
                  <button disabled={!p.estadoProveedor ? true : false} className='getProvider__bodybtn' onClick={() => {openEditProvider(p)}}>Editar</button>
                </td>
            </tr>))
            }
          </tbody>
        </table>
        <div className='spaceProvider'>
        </div>
      </div>
      </div>
    </div>
    <EditProvider activeEditProvider={activeEditProvider} setActiveEditProvider={setActiveEditProvider}/>
    </>
  )
}

export default GetProvider