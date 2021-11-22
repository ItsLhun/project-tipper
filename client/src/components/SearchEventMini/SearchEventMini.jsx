import React from 'react';
import { Link } from 'react-router-dom';

import './SearchEventMini.scss';

function SearchEventMini(props) {
  return (
    <div className="SearchArtistMini">
      <Link
        to={`/artist/${props.event?._id}`}
        className="SearchArtistMini_left"
      >
        <img
          className="SearchArtistMini_avatar"
          src={
            props.event?.artist?.avatarUrl ||
            'https://source.unsplash.com/random'
          }
          alt="artist"
        />
        <div className="SearchArtistMini_info">
          <span>{props.event?.title}</span>
          <span>Maybe genres here?</span>
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

export default SearchEventMini;
