import React, { useState, useEffect } from 'react';

import { loadArtist } from '../../services/artist';

import './TipArtist.scss';

function TipArtistView(props) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   props.onUserRefresh();
  // }, [props.user]);

  useEffect(() => {
    loadArtist(props.match.params.id).then((artist) => {
      setArtist(artist);
      setLoading(false);
    });
  }, [props.match.params.id]);

  useEffect(() => {
    if (!props.user) {
      props.onUserRefresh();
    }
    if (props.match.params.id === props.user?._id) {
      props.history.push('/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id, props.user?._id, props.history]);

  return (
    <div className="TipArtistView">
      <h2>Select amount</h2>
      {loading ? (
        <div>Loading details...</div>
      ) : (
        <>
          <div className="artist-info">
            <img src={artist.avatarUrl} alt={artist.firstName} />
            <h2>
              {artist.firstName} {artist.lastName}
            </h2>
            <em>{artist.bio}</em>
          </div>
          <div className="tip-amount">
            <button>$ 1</button>
            <button>$ 2</button>
            <button className="tip-active">$ 5</button>
            <button>$ 8</button>
            <button>$ 10</button>
            <button>...</button>
          </div>
        </>
      )}
      <button className="tip-btn">Send a Tip</button>
      <div className="tip-warning">
        This action is not reversible, please check the amount before tipping.
      </div>
    </div>
  );
}

export default TipArtistView;
