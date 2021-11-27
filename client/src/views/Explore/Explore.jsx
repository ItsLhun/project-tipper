import React, { useEffect } from 'react';

import MapContainer from '../../components/MapContainer/MapContainer';
import './Explore.scss';

function ExploreView(props) {
  // useEffect(() => {
  //   if (!props.user || !props.user.location) {
  //     props.onUserRefresh();
  //   }
  // }, []);

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
