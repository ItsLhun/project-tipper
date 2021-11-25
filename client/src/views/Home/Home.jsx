import React, { useEffect, useState } from 'react';

// this has to be first, we're resetting some styles
import './Home.scss';

import GenreBlob from '../../components/GenreBlob/GenreBlob';
import FeaturedMini from '../../components/FeaturedMini/FeaturedMini';

import PlayingTodayMini from '../../components/PlayingTodayMini/PlayingTodayMini';

import { getArtistList } from '../../services/artist';
import { listPlayingNowEvents } from '../../services/event';
import { listPlayingTodayEvents } from '../../services/event';
import { getDistancePoints } from '../../helpers/getDistancePoints';
import { Link } from 'react-router-dom';

function HomeView(props) {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [playingToday, setPlayingToday] = React.useState([]);

  useEffect(() => {
    getArtistList().then((artists) => {
      setFeaturedArtists(artists);
    });
    getPlayingToday();
  }, []);

  const getPlayingToday = () => {
    listPlayingTodayEvents().then((events) => {
      setPlayingToday(events);
      console.log(events);
      console.log(events.length);
    });
  };

  return (
    <div>
      <div className="HomeView">
        <section className="HomeView__section">
          <h2>Playing Today</h2>
          <ul className="playingToday">
            {playingToday.map((event) => {
              let distanceToUser = getDistancePoints(
                event.location.coordinates[0],
                event.location.coordinates[1],
                props.userLocation.lat,
                props.userLocation.lng
              );
              return (
                <PlayingTodayMini
                  key={event._id}
                  event={event}
                  artist={event.artist}
                  distanceToUser={distanceToUser.toFixed(2)}
                />
              );
            })}
          </ul>
        </section>
        <section className="HomeView__section">
          <h2>Featured Artists</h2>
          <ul className="featured-list">
            {featuredArtists?.map((artist) => (
              <FeaturedMini key={artist._id} artist={artist} />
            ))}
          </ul>
        </section>
        <section className="HomeView__section">
          <h2>Genres</h2>
          <ul className="HomeView__genres">
            {props.definedGenres.map((genre) => (
              <GenreBlob key={genre.value} genre={genre} />
            ))}
          </ul>
        </section>
        <Link to="/search">
          <section className="HomeView__section">
            <h2 className="search-title">Search...</h2>
          </section>
        </Link>
      </div>
    </div>
  );
}

export default HomeView;
