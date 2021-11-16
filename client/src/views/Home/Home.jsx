import React, { useState } from 'react';

import './Home.scss';
import GenreBlob from '../../components/GenreBlob/GenreBlob';

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
  return (
    <div className="HomeView">
      <section className="HomeView__section">
        <h2>Playing Today</h2>
      </section>
      <section className="HomeView__section">
        <h2>Featured Artists</h2>
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
  );
}

export default HomeView;
