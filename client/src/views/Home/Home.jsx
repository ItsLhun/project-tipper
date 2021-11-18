import React, { useState } from 'react';

import './Home.scss';
import GenreBlob from '../../components/GenreBlob/GenreBlob';
import MapOverlay from '../../components/MapOverlay/MapOverlay';

import { getArtistList } from '../../services/artist';

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
  const [showMap, setShowMap] = React.useState(false);

  const handleMapToggle = () => {
    setShowMap(!showMap);
  };

  const getArtists = async () => {
    try {
      const response = await getArtistList({});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {(!showMap && (
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
          <button onClick={handleMapToggle}>Select Point</button>
          <button onClick={getArtists}>Get Artists</button>
        </div>
      )) || <MapOverlay onClose={handleMapToggle} />}
    </div>
  );
}

export default HomeView;
