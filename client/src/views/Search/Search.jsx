import React from 'react';

import MapContainer from '../../components/MapContainer/MapContainer';
import MapSearch from '../../components/MapSearch/MapSearch';
import './Search.scss';

function SearchView() {
  return (
    <div className="SearchView">
      <MapSearch />
      <MapContainer />
    </div>
  );
}

export default SearchView;
