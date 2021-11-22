import React, { useState, useEffect, useRef } from 'react';
import { loadArtist } from '../../services/artist';
import StarRating from './../../components/StarRating/StarRating';
import { updateAccountSettings } from '../../services/profile-settings';
import { Link } from 'react-router-dom';
import { followArtist } from '../../services/artist';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';

import './ArtistProfile.scss';

function ArtistProfileView(props) {
  const [artist, setArtist] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editSettings, setEditSettings] = useState(false);
  const [email, setEmail] = useState(props.user?.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState(props.user?.bio);
  const [instruments, setInstruments] = useState(props.user?.instruments);
  const [genre, setGenre] = useState(props.user?.genre);
  const [follow, setFollow] = useState();
  const [rating, setRating] = useState();
  // const isInitialMount = useRef(true);

  useEffect(() => {
    getArtist();
  }, [
    props.user?.email,
    props.user?.password,
    props.user?.bio,
    props.user?.instruments,
    props.user?.genre
  ]);

  useEffect(() => {
    console.log('check for follows & ratings');
    getFollowAndRating();
  }, [props.user?.follow]);

  const getFollowAndRating = async () => {
    try {
      const response = await loadArtist(props.match.params.id);
      if (response.rating) {
        setRating(true);
      } else if (!response.rating) {
        setRating(false);
      }
      if (response.follow) {
        setFollow(true);
      } else {
        setFollow(false);
      }
      console.log(follow);
    } catch (error) {
      console.log(error);
    }
  };

  const getArtist = async () => {
    try {
      const artist = await loadArtist(props.match.params.id);
      setArtist({ ...artist.artistDetail });
      console.log(artist);
      console.log(props.user?._id === artist?._id);
      if (props.user?._id === artist?._id) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeSettings = async () => {
    try {
      setEditSettings(!editSettings);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccountSettings({
        email,
        password,
        confirmPassword,
        bio,
        genre,
        instruments
      });
      changeSettings();
      console.log(artist);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenreSelectionChange = (genre) => {
    setGenre({ genre: genre });
    console.log(genre);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'bio':
        setBio(value);
        break;
      case 'instruments':
        setInstruments(value);
        break;
      // case 'genre':
      //   setGenre(value);
      //   break;
      default:
        break;
    }
  };

  const followNow = async () => {
    try {
      const response = await followArtist(artist._id);
      console.log(response);
      setFollow(!follow);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={('UserProfileView', 'ArtistView')}>
      {editSettings && (
        <form className="UserProfileView_body_section" onSubmit={handleSubmit}>
          <h4 className="UserProfileView_body_section_title">ACCOUNT</h4>
          <div className="UserProfileView_body_section_content">
            <div className="UserProfileView_body_section_content_inputs">
              <span>Email:</span>
              <input
                //   This change is needed to prevent error of setting state to undefined
                value={props.user?.email || email}
                type="text"
                id="email-input"
                name="email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="UserProfileView_body_section_content_inputs">
              <span>Password:</span>
              <input
                value={password}
                type="password"
                id="password-input"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="UserProfileView_body_section_content_inputs">
              <span>Confirm Password:</span>
              <input
                value={confirmPassword}
                type="password"
                id="password-confirm-input"
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </div>
            <div className="UserProfileView_body_section_content_inputs">
              <span>Write something about yourself:</span>
              <input
                value={bio}
                type="text"
                id="bio-input"
                name="bio"
                onChange={handleInputChange}
              />
            </div>
            <div className="UserProfileView_body_section_content_inputs">
              <span>Which Instruments Do You Play?:</span>
              <input
                value={instruments}
                type="text"
                id="instruments-input"
                name="instruments"
                onChange={handleInputChange}
              />
            </div>
            <div className="UserProfileView_body_section_content_inputs">
              <span>Please Select Your Genres:</span>
              <GenreCheckbox
                options={[
                  { value: 'genre-african', label: 'African' },
                  { value: 'genre-arabic', label: 'Arabic' },
                  { value: 'genre-axe', label: 'Axé' },
                  { value: 'genre-blues', label: 'Blues' },
                  {
                    value: 'genre-bollywood-indian',
                    label: 'Bollywood & Indian'
                  },
                  { value: 'genre-classical', label: 'Classical' },
                  { value: 'rock', label: 'Rock' }
                ]}
                selected={genre}
                onSelectedChange={handleGenreSelectionChange}
              />
            </div>
          </div>
          <button className="save-changes-btn">Save Changes</button>
        </form>
      )}
      {isLoggedIn && (
        <button className={'settings-btn'} onClick={changeSettings}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#f5da00"
            viewBox="0 0 512 512"
          >
            <g>
              <line fill="none" y1="501" x1="303.1" y2="501" x2="302.1" />
              <g>
                <path d="m501,300.8v-91.7h-45.3c-5.3-22.4-14.3-43.3-26.4-62.1l32.9-32.7-64.9-64.6-33.4,33.3c-18.8-11.5-39.6-19.9-61.8-24.8v-47.2h-92.1v48.3c-22,5.4-42.6,14.4-61.1,26.4l-34.2-34-64.9,64.6 35.3,35.2c-2.8,4.6-5.3,9.2-7.7,14-7.5,14.3-13.2,30-17.1,45.7h-49.3v91.7h50.3c1.5,6 3.3,11.9 5.3,17.8 0.1,0.4 0.3,0.8 0.4,1.2 0,0.1 0.1,0.2 0.1,0.4 4.9,14.2 11.3,27.7 19.1,40.2l-35.5,35.3 64.9,64.6 35.1-34.9c18.3,11.5 38.6,20.2 60.2,25.4v48.1h91.1v-47.1c22.7-5 44-13.7 63.1-25.6l32.2,32 64.9-64.6-32.1-31.9c12-19.1 20.9-40.3 26-62.9h44.9zm-94.8,64l29.9,29.8-36.6,36.5-29.5-29.4c-24.7,18.9-54.4,31.7-86.7,36v42.4h-51.3v-42.7c-31.5-4.6-60.4-17.2-84.6-35.7l-31.6,31.5-36.6-36.5 32.4-31.3c-17.9-24-30-52.4-34.4-83.4h-45.3v-51.1h44l1.5-3.6c4.7-29.7 16.5-57.1 33.6-80.3l-32-31.9 36.6-36.5 31,31.9c24-18.5 52.8-31.2 84.1-36v-42.7h51.3v42.3c32,4.1 61.3,16.4 86,34.8l30.3-30.1 35.6,36.5-29.6,29.5c18.2,23.8 30.7,52.2 35.5,83.1h45.4v51.1h-44.7c-3.9,31.8-16.1,61.1-34.3,85.8z" />
                <path d="m257,143.4c-61.8,0-113.1,50-113.1,112.6s51.4,112.6 113.1,112.6 113.1-51.1 113.1-112.6-51.3-112.6-113.1-112.6zm0,204.3c-51.3,0-92.1-40.7-92.1-91.7 0-51.1 41.9-91.7 92.1-91.7s92.1,40.7 92.1,91.7c0.1,51.1-41.8,91.7-92.1,91.7z" />
              </g>
            </g>
          </svg>
        </button>
      )}

      <button className={'sign-out-btn'} onClick={props.onSignOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#f5da00"
        >
          <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
        </svg>
      </button>
      <div className={'UserProfileView_header'}>
        <div>
          <div className={'BackgroundImgAndButton'}>
            {artist?.backgroundImg ? (
              <img
                className={'Background'}
                src={artist.backgroundImg}
                alt="Artist pic"
              />
            ) : (
              <img
                className={'Background'}
                src={'https://source.unsplash.com/400x500/?musician'}
                alt="random musician"
              />
            )}

            {isLoggedIn && (
              <Link to="/artist/upload-background">
                <button className={'background-btn'}>
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <g>
                        <path
                          d="M403.914,0L54.044,349.871L0,512l162.128-54.044L512,108.086L403.914,0z M295.829,151.319l21.617,21.617L110.638,379.745
			l-21.617-21.617L295.829,151.319z M71.532,455.932l-15.463-15.463l18.015-54.043l51.491,51.491L71.532,455.932z M153.871,422.979
			l-21.617-21.617l206.809-206.809l21.617,21.617L153.871,422.979z M382.297,194.555l-64.852-64.852l21.617-21.617l64.852,64.852
			L382.297,194.555z M360.679,86.468l43.234-43.235l64.853,64.853l-43.235,43.234L360.679,86.468z"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              </Link>
            )}
          </div>
        </div>

        <h3 className="Profile-name">
          {artist?.firstName} {artist?.lastName}
        </h3>

        <div className="Artist-avatar">
          {artist?.avatarUrl ? (
            <img
              className={'UserProfileView_avatar'}
              // src={'https://source.unsplash.com/random'}
              src={artist?.avatarUrl}
              alt={'avatar'}
            />
          ) : (
            <div className={'UserProfileView_avatar_text'}>
              <span>
                {artist?.firstName[0]} {artist?.lastName[0]}
              </span>
            </div>
          )}
          {isLoggedIn && (
            <Link to="/profile/upload-avatar">
              <button className={'avatar-btn-artist'}>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#f5da00"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path
                        d="M403.914,0L54.044,349.871L0,512l162.128-54.044L512,108.086L403.914,0z M295.829,151.319l21.617,21.617L110.638,379.745
			l-21.617-21.617L295.829,151.319z M71.532,455.932l-15.463-15.463l18.015-54.043l51.491,51.491L71.532,455.932z M153.871,422.979
			l-21.617-21.617l206.809-206.809l21.617,21.617L153.871,422.979z M382.297,194.555l-64.852-64.852l21.617-21.617l64.852,64.852
			L382.297,194.555z M360.679,86.468l43.234-43.235l64.853,64.853l-43.235,43.234L360.679,86.468z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </Link>
          )}
        </div>

        <div className={'AboutArtist-section'}>
          {artist?.bio && <span>{artist.bio}</span>}
          {artist?.instruments && <span>I play {artist.instruments}</span>}
          {artist?.genre && <span>{artist.genre}</span>}
        </div>

        <StarRating
          {...props}
          artist={artist}
          rating={rating}
          user={props.user}
          isLoggedIn={isLoggedIn}
        />

        <div className={'ArtistProfileView_follow'}>
          <div>{artist?.followerCount} followers</div>
          {!isLoggedIn && follow && (
            <button className={'onFollow'} onClick={followNow}>
              Followed
            </button>
          )}
          {!isLoggedIn && !follow && (
            <button className={'offFollow'} onClick={followNow}>
              Follow
            </button>
          )}
          {!isLoggedIn && <button className={'GenreBlob'}>$ tip</button>}
        </div>
      </div>
      <div className={'UserProfileView_body'}>
        <div className={'UserProfileView_body_section'}>
          <div className={'EventsAndNew'}>
            <h3>Upcoming Events</h3>
            {isLoggedIn && (
              <Link to="/event/create">
                <button className={'addEvent-btn'}>+</button>
              </Link>
            )}
          </div>
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
