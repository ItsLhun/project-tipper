import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import img from '../MapContainer/Vector.svg';

import '../MapContainer/MapContainer.scss';

function MapContainerView(props) {
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
    lat: 0,
    lng: 0
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

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleConfirmation = () => {
    let lat = map?.getCenter().lat();
    let lng = map?.getCenter().lng();
    console.log(lat, lng);
    props.onConfirmation({ lat, lng });
    props.onClose();
  };

  if (loadError) {
    return <div>Map cannot be loaded right now.</div>;
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
      center={centerMap}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      yesIWantToUseGoogleMapApiInternals
      // disableDefaultUI={true}
      defaultCenter={centerMap}
      options={setOptions(map)}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <img src={img} alt="Pin" className="overlay-pin" />
      <div className="buttons-container">
        <button
          className="confirm-btn overlay-btn"
          onClick={handleConfirmation}
        >
          Confirm Location
        </button>
        <button className="exit-btn overlay-btn" onClick={props.onClose}>
          Exit
        </button>
      </div>
    </GoogleMap>
  ) : (
    <>Loading view?...</>
  );
}

export default React.memo(MapContainerView);
