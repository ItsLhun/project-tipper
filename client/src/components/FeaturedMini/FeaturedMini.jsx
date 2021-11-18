import React from 'react';

import './FeaturedMini.scss';

function FeaturedMini(props) {
  console.log(props);
  return (
    <li className="FeaturedMini">
      <img
        src={props.artist.backgroundImg || 'https://source.unsplash.com/random'}
        alt={props.artist.firstName}
      />
    </li>
  );
}

export default FeaturedMini;
