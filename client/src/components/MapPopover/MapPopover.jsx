import React from 'react';

import { OverlayView } from '@react-google-maps/api';

function MapPopover() {
  return (
    <div>
      <OverlayView
        position={{ lat: 40.425881, lng: -3.719168 }}
        mapPaneName={OverlayView.FLOAT_PANE}
      >
        <div className="map-popover">
          <button>X</button>
        </div>
      </OverlayView>
    </div>
  );
}

export default MapPopover;
