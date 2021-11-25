import React from 'react';

import MapContainer from '../../components/MapContainer/MapContainer';
import MapSearch from '../../components/MapSearch/MapSearch';
import './Explore.scss';

function ExploreView(props) {
  const handleSearchClick = (e) => {
    console.log('Search clicked');
  };
  return (
    <div className="ExploreView">
      <MapSearch onClick={handleSearchClick} />
      <MapContainer userLocation={props.userLocation} />
    </div>
  );
}

export default ExploreView;
