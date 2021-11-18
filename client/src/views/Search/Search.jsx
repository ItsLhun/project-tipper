import React from 'react';

import MapContainer from '../../components/MapContainer/MapContainer';
import MapSearch from '../../components/MapSearch/MapSearch';
import './Search.scss';

function SearchView() {
  const handleSearchClick = (e) => {
    console.log('Search clicked');
  };
  return (
    <div className="SearchView">
      <MapSearch onClick={handleSearchClick} />
      <MapContainer />
    </div>
  );
}

export default SearchView;
