import React from 'react';

import MapContainer from '../../components/MapContainer/MapContainer';
import MapSearch from '../../components/MapSearch/MapSearch';
import './Explore.scss';

function ExploreView() {
  const handleSearchClick = (e) => {
    console.log('Search clicked');
  };
  return (
    <div className="ExploreView">
      <MapSearch onClick={handleSearchClick} />
      <MapContainer />
    </div>
  );
}

export default ExploreView;
