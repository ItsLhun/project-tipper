import React from 'react';

import './MapSearch.scss';

function MapSearch(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        className="SearchBar"
        onClick={props.onClick}
      />
    </div>
  );
}

export default MapSearch;
