import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { geocodeLatLng } from '../../helpers/geocodeLatLng';

import './SearchArtistMini.scss';

function SearchArtistMini(props) {
  const [lastLocationCity, setLastLocationCity] = React.useState('The world');

  const handleLastLocation = (coords, address) => {
    if (address) {
      setLastLocationCity(
        `${address.address_components[3].long_name}, ${address.address_components[4].long_name}`
      );
    }
  };

  const handleGeocode = async () => {
    if (props.artist.lastLocation) {
      await geocodeLatLng(
        props.geocoder,
        {
          lat: props.artist.lastLocation.coordinates[0],
          lng: props.artist.lastLocation.coordinates[1]
        },
        handleLastLocation
      );
    }
  };

  console.log(lastLocationCity);
  useEffect(() => {
    handleGeocode();
  }, []);

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
          <span>{lastLocationCity}</span>
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
