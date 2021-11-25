import React from 'react';
import { Link } from 'react-router-dom';

import './SearchArtistMini.scss';

function SearchArtistMini(props) {
  const geocoder = new window.google.maps.Geocoder();

  console.log(geocoder);
  return (
    <div className="SearchArtistMini">
      <Link
        to={`/artist/${props.artist?._id}`}
        className="SearchArtistMini_left"
      >
        <img
          className="SearchArtistMini_avatar"
          src={props.artist?.avatarUrl || 'https://source.unsplash.com/random'}
          alt="artist"
        />
        <div className="SearchArtistMini_info">
          <span>
            {props.artist?.firstName} {props.artist?.lastName}
          </span>
          <span>
            {props.artist?.lastLocation
              ? props.artist?.lastLocation?.coordinates[0]
              : 'The world'}
          </span>
        </div>
      </Link>

      <div className="options-dots">
        <span className="options-dot" />
        <span className="options-dot" />
        <span className="options-dot" />
      </div>
    </div>
  );
}

export default SearchArtistMini;
