import React from 'react';
import { Link } from 'react-router-dom';

import { getDistancePoints } from '../../helpers/getDistancePoints';

import '../SearchArtistMini/SearchArtistMini.scss';

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
          <span>
            {props.event?.artist.firstName} {props.event?.artist.lastName}
          </span>
          <span className="distance-span">{props.distanceToUser} km</span>
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
