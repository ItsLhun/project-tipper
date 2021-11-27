import React from 'react';

import MapContainer from '../../components/MapContainer/MapContainer';
import './Explore.scss';

function ExploreView(props) {
  return (
    <div className="ExploreView">
      {/* <MapSearch onClick={handleSearchClick} /> */}
      <MapContainer
        userLocation={props.userLocation}
        onUserRefresh={props.onUserRefresh}
      />
    </div>
  );
}

export default ExploreView;
