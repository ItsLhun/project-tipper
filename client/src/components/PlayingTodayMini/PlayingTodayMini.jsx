import React from 'react';
import { Link } from 'react-router-dom';
import './PlayingTodayMini.scss';

function PlayingTodayMini(props) {
  console.log(props);
  return (
    <li className="PlayingTodayMini">
      <Link to={`/event/${props.event._id}`}>
        <img
          src={
            props.artist.backgroundImg ||
            `https://source.unsplash.com/random?sig=${props.artist._id}`
          }
          alt={props.artist.firstName} {props.artist.lastName}
        />
       <p> {props.artist.firstName} {props.artist.lastName}</p>
       <figcaption>
         
        {props.event.time} @ {props.event.location}
       </figcaption>
      </Link>
    </li>
  );
}

export default PlayingTodayMini;
