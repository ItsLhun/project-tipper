// create miniature google maps component with single marker
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import img from '../MapContainer/Vector.svg';

export default function Minimap(props) {
  const { mapContainerStyle, mapCenter } = props;

  return (
    <div style={mapContainerStyle}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={mapCenter}
      >
        <Marker icon={img} position={mapCenter} />
      </GoogleMap>
    </div>
  );
}
