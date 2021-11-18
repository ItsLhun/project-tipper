import React, { useState, useEffect } from 'react';
import { loadArtist } from '../../services/artist';
import { Link } from 'react-router-dom';
import StarRating from './../../components/StarRating/StarRating';

import './ArtistProfile.scss';

function ArtistProfileView(props) {
  const [artist, setArtist] = useState('');

  useEffect(() => {
    getArtist();
  }, []);

  const getArtist = async () => {
    try {
      const artist = await loadArtist(this.props.match.params.id);
      setArtist({ artist });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={'UserProfileView'}>
      <button className={'sign-out-btn'} onClick={props.onSignOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
        </svg>
      </button>
      <div className={'UserProfileView_header'}>
        {props.user._id === artist._id ? (
          <Link to="/artist/upload-background">
            {artist.backgroundImg ? (
              <img src={artist.backgroundImg} alt="Artist pic" />
            ) : (
              <img
                src={'https://source.unsplash.com/400x500/?musician'}
                alt="random musician"
              />
            )}
          </Link>
        ) : (
          <div>
            {artist.backgroundImg ? (
              <img src={artist.backgroundImg} alt="Artist pic" />
            ) : (
              <img
                src={'https://source.unsplash.com/400x500/?musician'}
                alt="random musician"
              />
            )}
          </div>
        )}

        <h3 className="Profile-name">
          {`${artist.firstName} ${artist.lastName}`}
        </h3>
        {props.user._id === artist._id ? (
          <Link to="/profile/upload-avatar">
            {artist.avatarUrl ? (
              <img
                className={'UserProfileView_avatar'}
                // src={'https://source.unsplash.com/random'}
                src={artist.avatarUrl}
                alt={'avatar'}
              />
            ) : (
              <div className={'UserProfileView_avatar_text'}>
                <span className="Profile-letters">
                  {/* {artist.firstName[0]}
              {artist.lastName[0]} */}
                  MJ
                </span>
              </div>
            )}
          </Link>
        ) : (
          <div>
            {artist.avatarUrl ? (
              <img
                className={'UserProfileView_avatar'}
                // src={'https://source.unsplash.com/random'}
                src={artist.avatarUrl}
                alt={'avatar'}
              />
            ) : (
              <div className={'UserProfileView_avatar_text'}>
                <span className="Profile-letters">
                  {/* {artist.firstName[0]}
              {artist.lastName[0]} */}
                  MJ
                </span>
              </div>
            )}
          </div>
        )}

        {/* {artist.bio && <span>{artist.bio}</span>} */}
        <p>This is my bio.</p>
        <StarRating />
        <span>4.3 (200)</span>
        <div className={'ArtistProfileView_follow'}>
          <div>X followers</div>
          <div>
            <button>follow</button>
          </div>
          <div>
            <button>$ tip</button>
          </div>
        </div>
      </div>

      <div className={'UserProfileView_body'}>
        <div className={'UserProfileView_body_section'}>
          <h3>Upcoming Events</h3>
          {/* <EventDetailView /> */}
          <p>
            Location:
            <br />
            Time:
            <br />
            Date:
            <br />
            Price: free
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArtistProfileView;
