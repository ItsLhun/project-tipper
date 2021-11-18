import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// import MapPin from '../../components/MapPin/MapPin';

import img from './Vector.svg';

import './MapContainer.scss';

function MapContainerView() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
  });

  const setOptions = (map) => {
    return {
      // disableDefaultUI: true,
      initZoomControl: true,
      zoomControlOptions: {
        // moved by SCSS
        position: window.google?.maps.ControlPosition.RIGHT_BOTTOM,
        style: window.google?.maps.ZoomControlStyle.LARGE
      },
      mapTypeControlOptions: {
        // remove map type control
        position: window.google?.maps.ControlPosition.TOP_LEFT,
        style: window.google?.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
    };
  };

  const [map, setMap] = useState(null);
  const [centerMap, setCenterMap] = useState({
    lat: 40.745,
    lng: -3.523
  });

  const onLoad = useCallback((map) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      if (pos) {
        console.log(pos);
        setCenterMap(pos);
        setMap(map);
      }
    });
  }, []);

  const handleMapClick = (event) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());

    let pos = navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      if (pos) {
        console.log(pos);
      }
    });
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Map cannot be loaded right now.</div>;
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100vh'
      }}
      center={centerMap}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      yesIWantToUseGoogleMapApiInternals
      // disableDefaultUI={true}
      defaultCenter={centerMap}
      options={setOptions(map)}
      onClick={handleMapClick}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker icon={img} position={centerMap} />
      <Marker
        icon={img}
        position={{ lat: 40.425668582770484, lng: -3.712250706743283 }}
      />
    </GoogleMap>
  ) : (
    <>Loading view?...</>
  );
}

export default React.memo(MapContainerView);
