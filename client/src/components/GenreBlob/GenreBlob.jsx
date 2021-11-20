import React from 'react';
import { Link } from 'react-router-dom';

import './Genreblob.scss';

function GenreBlob(props) {
  return (
    <div className="GenreBlob">
      <Link to={`/search?genre=${props.genre.value}`}>{props.genre.label}</Link>
    </div>
  );
}

export default GenreBlob;
