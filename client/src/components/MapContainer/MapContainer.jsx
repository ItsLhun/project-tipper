import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { listPlayingNowEvents } from '../../services/event';
// import MapPin from '../../components/MapPin/MapPin';

import img from './Vector.svg';
import userLocation from './userlocation.svg';

import './MapContainer.scss';

function MapContainerView(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
  });
  const [map, setMap] = useState(null);
  const [centerMap, setCenterMap] = useState(null);
  const [playingEvents, setPlayingEvents] = useState([]);

  const fetchPlayingEvents = async () => {
    try {
      const events = await listPlayingNowEvents();
      setPlayingEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  const setOptions = (map) => {
    return {
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

  useEffect(() => {
    setCenterMap(props.userLocation);
  }, []);

  const onLoad = useCallback((map) => {
    setMap(map);
    fetchPlayingEvents();
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
    console.log('Current position: ' + pos);
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Map cannot be loaded right now.</div>;
  }
  return isLoaded && props.userLocation ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100vh'
      }}
      center={props.userLocation}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      yesIWantToUseGoogleMapApiInternals
      defaultCenter={props.userLocation}
      options={setOptions(map)}
      onClick={handleMapClick}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {playingEvents.map((event) => (
        <Marker
          key={event._id}
          position={{
            lat: event.location.coordinates[0],
            lng: event.location.coordinates[1]
          }}
          icon={img}
        />
      ))}

      <Marker icon={userLocation} position={centerMap} />
    </GoogleMap>
  ) : (
    <>Loading view?...</>
  );
}

export default React.memo(MapContainerView);
