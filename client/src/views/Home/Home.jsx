import React, { useState } from 'react';

import './Home.scss';
import GenreBlob from '../../components/GenreBlob/GenreBlob';
import FeaturedMini from '../../components/FeaturedMini/FeaturedMini';
// import PlayingTodayMini from '../../components/PlayingTodayMini/PlayingTodayMini';

import { getArtistList } from '../../services/artist';
import { listPlayingNowEvents } from '../../services/event';

function HomeView() {
  // Genres can be set dynamically or from a DB.
  const [genres] = useState([
    'hip hop',
    'pop',
    'jazz',
    'instrumental',
    'rock',
    'country'
  ]);
  const [featuredArtists, setFeaturedArtists] = React.useState([]);

  React.useEffect(() => {
    getArtistList().then((artists) => {
      setFeaturedArtists(artists);
    });
  }, []);

  React.useEffect(() => {
    listPlayingNowEvents().then((events) => {
      console.log(events);
    });
  }, []);

  return (
    <div>
      <div className="HomeView">
        <section className="HomeView__section">
          <h2>Playing Today</h2>
          <ul>
            {listPlayingNowEvents().map((event) => (
              // <PlayingTodayMini />
              <li>{event.name}</li>
            ))}
          </ul>
        </section>
        <section className="HomeView__section">
          <h2>Featured Artists</h2>
          <ul className="featured-list">
            {featuredArtists?.map((artist) => (
              <FeaturedMini key={artist.firstName} artist={artist} />
            ))}
          </ul>
        </section>
        <section className="HomeView__section">
          <h2>Genres</h2>
          <ul className="HomeView__genres">
            {genres.map((genre) => (
              <GenreBlob key={genre} genre={genre} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default HomeView;
