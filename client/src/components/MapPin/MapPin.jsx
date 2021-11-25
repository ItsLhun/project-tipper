import React, { useState } from 'react';

import { Marker, InfoWindow } from '@react-google-maps/api';
import PlayingTodayMini from '../PlayingTodayMini/PlayingTodayMini';

import './MapPin.scss';

function MapPin(props) {
  const [isVisible, setIsVisible] = useState(false);

  const displayInfo = (event) => {
    props.setActiveInfo(props.event._id);
    setIsVisible(true);
    console.log(event, isVisible);
  };

  const handleCloseClick = () => {
    props.setActiveInfo(null);
    setIsVisible(false);
  };

  return (
    <>
      <Marker
        position={{
          lat: props.event.location.coordinates[0],
          lng: props.event.location.coordinates[1]
        }}
        icon={props.icon}
        onClick={displayInfo}
      />
      {props.activeInfo === props.event._id && (
        <InfoWindow
          position={{
            lat: props.event.location.coordinates[0],
            lng: props.event.location.coordinates[1]
          }}
          onCloseClick={handleCloseClick}
        >
          <div className="event-details-infowindow">
            {/* Temporary, create ad-hoc solution for this, distance not needed */}
            <PlayingTodayMini event={props.event} artist={props.event.artist} />
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default MapPin;
