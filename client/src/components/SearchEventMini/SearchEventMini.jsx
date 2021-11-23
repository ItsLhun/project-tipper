import React from 'react';
import { Link } from 'react-router-dom';

import { formatTimeWithOffset } from '../../helpers/formatTimeWithOffset';

import '../SearchArtistMini/SearchArtistMini.scss';

import './SearchEventMini.scss';

function SearchEventMini(props) {
  const eventDate = props.event.date.split('T')[0];
  const eventTime = props.event.date.split('T')[1]?.split('.')[0].slice(0, -3);
  let ongoing = false;
  let minutesLeft = 0;
  if (new Date(props.event.date) < new Date()) {
    ongoing = true;
    minutesLeft =
      props.event.duration +
      Math.floor((new Date(props.event.date) - new Date().getTime()) / 60000);
  }
  return (
    <div className="SearchArtistMini">
      <Link to={`/event/${props.event?._id}`} className="SearchArtistMini_left">
        <img
          className={`SearchArtistMini_avatar ${ongoing ? 'live-avatar' : ''}`}
          src={
            props.event?.artist?.avatarUrl ||
            'https://source.unsplash.com/random'
          }
          alt="artist"
        />
        <div className="SearchArtistMini_info">
          <span>{props.event?.title}</span>
          <span>
            {!ongoing && (
              <span className="distance-span">
                {eventDate + ' @ ' + formatTimeWithOffset(eventTime)}
              </span>
            )}
            {ongoing && (
              <span className="distance-span">
                LIVE - ({minutesLeft >= 0 ? minutesLeft : 0}
                {minutesLeft === 1 ? ' min' : ' mins'} left)
              </span>
            )}
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
