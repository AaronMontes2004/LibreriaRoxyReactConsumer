import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { request } from '../../libs/urlConsumer';

export const LocationContext = createContext();

const LocationState = (props) => {

  const [pageStatus, setPageStatus] = useState(true);
  const [locationList, setLocationList] = useState([]);

  const [editLocation, setEditLocation] = useState({});

  useEffect(() => {
    const listLocations = async () => {
      const categories = await request.get("location");
      setLocationList(categories.data.data);
    }

    listLocations();
  }, [pageStatus])

  return (
    <LocationContext.Provider value={{
      pageStatus: pageStatus,
      setPageStatus: setPageStatus,
      locationList: locationList,
      editLocation: editLocation,
      setEditLocation: setEditLocation
    }}>
        {props.children}
        <Outlet/>
    </LocationContext.Provider>
  )
}

export default LocationState