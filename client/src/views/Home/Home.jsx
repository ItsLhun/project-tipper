import React, { useEffect, useState } from 'react';

// this has to be first, we're resetting some styles
import './Home.scss';

import GenreBlob from '../../components/GenreBlob/GenreBlob';
import FeaturedMini from '../../components/FeaturedMini/FeaturedMini';

import PlayingTodayMini from '../../components/PlayingTodayMini/PlayingTodayMini';

import { getArtistList } from '../../services/artist';
<<<<<<< HEAD
import { listPlayingNowEvents } from '../../services/event';
=======
import { listPlayingTodayEvents } from '../../services/event';
import { getDistancePoints } from '../../helpers/getDistancePoints';

function HomeView(props) {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [playingToday, setPlayingToday] = React.useState([]);
>>>>>>> c3174bb7730fe3074954feb9eb6fecd694bb5645

  useEffect(() => {
    getArtistList().then((artists) => {
      setFeaturedArtists(artists);
    });
    getPlayingToday();
  }, []);

<<<<<<< HEAD
  React.useEffect(() => {
    listPlayingNowEvents().then((events) => {
      console.log(events);
    });
  }, []);
=======
  const getPlayingToday = () => {
    listPlayingTodayEvents().then((events) => {
      setPlayingToday(events);
      console.log(events);
      console.log(events.length);
    });
  };
>>>>>>> c3174bb7730fe3074954feb9eb6fecd694bb5645

  return (
    <div>
      <div className="HomeView">
        <section className="HomeView__section">
          <h2>Playing Today</h2>
<<<<<<< HEAD
          <ul>
            {listPlayingNowEvents().map((event) => (
              // <PlayingTodayMini />
              <li>{event.name}</li>
            ))}
=======
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
>>>>>>> c3174bb7730fe3074954feb9eb6fecd694bb5645
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
      </div>
    </div>
  );
}

export default HomeView;
