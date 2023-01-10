import React, { useContext, useState } from 'react'
import { LocationContext } from '../../contexts/location/LocationState';
import { request } from '../../libs/urlConsumer';
import "../../../assets/css/location/location.css";
import EditLocation from './EditLocation';

const GetLocation = () => {

  const {locationList, pageStatus, setPageStatus, setEditLocation} = useContext(LocationContext);
  const [activeEditLocation, setActiveEditLocation] = useState(false);
  const functionChangeStatus = async (id) => {
    console.log(id);
    const res = await request.put("location/changeStatus/"+id);
    setPageStatus(!pageStatus);
    console.log(res.data);
  }

  const openEditLocation = (c) => {
    setActiveEditLocation(true);
    setEditLocation(c)
    console.log(c);
  }

  return (
    <>
    <div className='getLocation'>
      <table className='getLocation__table'>
        <thead className='getLocation__head'>
          <tr className='getLocation__headrow'>
            <th className='getLocation__headcolumn'>Id</th>
            <th className='getLocation__headcolumn'>Nombre</th>
            <th className='getLocation__headcolumn'>Estado</th>
            <th className='getLocation__headcolumn'>Opciones</th>
          </tr>
        </thead>
        <tbody className='getLocation__body'>
          {
            locationList.map((l, i) => (
            <tr key={l.idUbicacion} className={!l.estadoUbicacion ? 'getLocation__bodyrow getLocation__bodyrow--disabled': 'getLocation__bodyrow'}>
              <td className='getLocation__bodycolumn'>{i+1}</td>
              <td className='getLocation__bodycolumn'>{l.nombreUbicacion}</td>
              <td className='getLocation__bodycolumn'>
                <input onChange={() => functionChangeStatus(l.idUbicacion)} defaultChecked={l.estadoUbicacion ? true : false} type="checkbox" className='getLocation__bodycheck'/>
              </td>
              <td className='getLocation__bodycolumn'>
                <button disabled={!l.estadoUbicacion ? true : false} className='getLocation__bodybtn' onClick={() => {openEditLocation(l)}}>Editar</button>
              </td>
          </tr>))
          }
        </tbody>
      </table>
      <div className='spaceLocation'>
      </div>
    </div>
    <EditLocation activeEditLocation={activeEditLocation} setActiveEditLocation={setActiveEditLocation} />
    </>
  )
}

export default GetLocation