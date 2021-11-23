import React from 'react';
import { Link } from 'react-router-dom';
import './PlayingTodayMini.scss';

function PlayingTodayMini(props) {
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
  console.log(props);
  return (
    <li className="PlayingTodayMini">
      <Link to={`/event/${props.event._id}`}>
        <img
          src={
            props.artist.backgroundImg ||
            `https://source.unsplash.com/random?sig=${props.artist._id}`
          }
          className={`${ongoing ? 'live-avatar' : ''}`}
          alt={props.artist.firstName}
        />
        <p>
          {props.artist.firstName} {props.artist.lastName}
        </p>

        <figcaption>
          <span>
            {!ongoing && (
              <span className="distance-span">{' @ ' + eventTime}</span>
            )}
            {ongoing && (
              <span className="distance-span">
                ({minutesLeft >= 0 ? minutesLeft : 0}
                {minutesLeft === 1 ? ' min' : ' mins'} left)
              </span>
            )}
          </span>
        </figcaption>
        <span className="distance-span">{props.distanceToUser} km</span>
      </Link>
    </li>
  );
}

export default PlayingTodayMini;
