import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedMini.scss';

function FeaturedMini(props) {
  return (
    <li className="FeaturedMini">
      {/* Link to artist public profile */}
      <Link to={`/artist/${props.artist._id}`}>
        <img
          src={
            props.artist.backgroundImg ||
            `https://source.unsplash.com/random?sig=${props.artist._id}`
          }
          alt={props.artist.firstName}
        />
        <figcaption>
          {props.artist.firstName} {props.artist.lastName}
        </figcaption>
      </Link>
    </li>
  );
}

export default FeaturedMini;
