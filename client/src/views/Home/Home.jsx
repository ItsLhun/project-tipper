import React, { useState } from 'react';

import './Home.scss';

function HomeView(props) {
  // Genres can be set dynamically or from a DB.
  const [genres, setGenres] = useState([
    'hip hop',
    'pop',
    'jazz',
    'rock',
    'instrumental',
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
            <div key={genre} className="HomeView__genre">
              {genre}
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomeView;
