import React from 'react';

import './NoResults.scss';

function NoResults(props) {
  return (
    <div className="NoResults">
      <p>{props.message}</p>
    </div>
  );
}

export default NoResults;
