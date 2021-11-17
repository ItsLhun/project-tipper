import React from 'react';

import MapContainer from '../../components/MapContainer/MapContainer';

import './Search.scss';

function SearchView() {
  return (
    <div className="SearchView">
      <input
        type="text"
        placeholder="Search for a location"
        className="SearchBar"
      />
      <MapContainer />
    </div>
  );
}

export default SearchView;
