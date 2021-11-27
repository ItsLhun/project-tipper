import React, { useCallback, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete
} from '@react-google-maps/api';
import { listPlayingNowEvents } from '../../services/event';
import MapPin from '../../components/MapPin/MapPin';
import { getDistancePoints } from '../../helpers/getDistancePoints';
import MapSearch from '../MapSearch/MapSearch';

import img from './Vector.svg';
import userLocation from './userlocation.svg';

import './MapContainer.scss';

function MapContainerView(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries: ['places']
  });
  const [map, setMap] = useState(null);
  const [centerMap, setCenterMap] = useState({
    lat: +props.userLocation?.lat,
    lng: +props.userLocation?.lng
  });
  const [playingEvents, setPlayingEvents] = useState([]);
  const [activeInfo, setActiveInfo] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const fetchPlayingEvents = async () => {
    try {
      const events = await listPlayingNowEvents();
      setPlayingEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  const onPlaceChanged = () => {
    console.log('onPlaceChanged');
    const place = autocomplete.getPlace();
    let center;
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      center = { lat: +parseFloat(lat()), lng: +parseFloat(lng()) };
    } else {
      center = { lat: +props.userLocation?.lat, lng: +props.userLocation?.lng };
    }
    setCenterMap(center);

    console.log(center);
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

  // useEffect(() => {
  //   if (!props.userLocation && !props.user?.lastLocation) {
  //     props.onUserRefresh();
  //     return;
  //   } else if (props.user.lastLocation) {
  //     const { lat, lng } = props.user.lastLocation;
  //     const center = { lat: parseFloat(lat), lng: parseFloat(lng) };
  //     setCenterMap(center);
  //   } else {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       if (pos) {
  //         setCenterMap(pos);
  //       }
  //     });
  //   }
  // }, []);

  const onLoad = useCallback((map) => {
    setMap(map);
    fetchPlayingEvents();
  }, []);

  const handleMapClick = (event) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
    let pos = navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: +position.coords.latitude,
        lng: +position.coords.longitude
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
      center={centerMap}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      yesIWantToUseGoogleMapApiInternals
      defaultCenter={props.userLocation}
      options={setOptions(map)}
      onClick={handleMapClick}
    >
      <Autocomplete
        onLoad={(autocomplete) => {
          setAutocomplete(autocomplete);
        }}
        onPlaceChanged={onPlaceChanged}
      >
        <MapSearch />
      </Autocomplete>
      {playingEvents.map((event) => {
        let distanceToUser = getDistancePoints(
          event.location.coordinates[0],
          event.location.coordinates[1],
          props.userLocation.lat,
          props.userLocation.lng
        );
        return (
          <MapPin
            event={event}
            key={event._id}
            icon={img}
            activeInfo={activeInfo}
            setActiveInfo={setActiveInfo}
            distanceToUser={distanceToUser}
          />
        );
      })}

      <Marker icon={userLocation} position={props.userLocation} />
    </GoogleMap>
  ) : (
    <>Loading view?...</>
  );
}

export default React.memo(MapContainerView);
