import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import './MapContainer.scss';

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'red',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    {text}
  </div>
);
const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MapContainerView() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);
  console.log(map);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <AnyReactComponent
        lat={59.955413}
        lng={30.337844}
        text={'Kreyser Avrora'}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapContainerView);
