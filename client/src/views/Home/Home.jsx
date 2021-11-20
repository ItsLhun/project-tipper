import React, { useState } from 'react';

// this has to be first, we're resetting some styles
import './Home.scss';

import GenreBlob from '../../components/GenreBlob/GenreBlob';
import FeaturedMini from '../../components/FeaturedMini/FeaturedMini';

// import PlayingTodayMini from '../../components/PlayingTodayMini/PlayingTodayMini';

import { getArtistList } from '../../services/artist';

function HomeView() {
  // Genres can be set dynamically or from a DB.
  // values can be different than name to allow special characters or spaces
  const [genres] = useState([
    {
      label: 'hip hop',
      value: 'hip-hop'
    },
    {
      label: 'rock',
      value: 'rock'
    },
    {
      label: 'pop',
      value: 'pop'
    },
    {
      label: 'country',
      value: 'country'
    },
    {
      label: 'jazz',
      value: 'jazz'
    },
    {
      label: 'classical',
      value: 'classical'
    },
    {
      label: 'blues',
      value: 'blues'
    }
  ]);
  const [featuredArtists, setFeaturedArtists] = React.useState([]);

  React.useEffect(() => {
    getArtistList().then((artists) => {
      setFeaturedArtists(artists);
    });
  }, []);

  return (
    <div>
      <div className="HomeView">
        <section className="HomeView__section">
          <h2>Playing Today</h2>
          <ul>{/* <PlayingTodayMini /> */}</ul>
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
              <GenreBlob key={genre.value} genre={genre} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default HomeView;
