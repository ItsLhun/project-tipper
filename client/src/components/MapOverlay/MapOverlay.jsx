import React, { useCallback, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

import { geocodeLatLng } from '../../helpers/geocodeLatLng';

import img from '../MapContainer/Vector.svg';

import '../MapContainer/MapContainer.scss';

function MapContainerView(props) {
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

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleConfirmation = async () => {
    let lat = map?.getCenter().lat();
    let lng = map?.getCenter().lng();
    console.log(lat, lng);
    let address = 'Not set';
    if (props.geocoder) {
      address = await geocodeLatLng(
        props.geocoder,
        { lat, lng },
        props.onConfirmation
      );
    }
    console.log('The address is:', address);
    // props.onConfirmation({ lat, lng }, address);
    props.onClose();
  };

  if (!props.isLoaded) {
    return <div>Map cannot be loaded right now.</div>;
  }
  return props.isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
      center={props.userLocation}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      yesIWantToUseGoogleMapApiInternals
      defaultCenter={props.userLocation}
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
