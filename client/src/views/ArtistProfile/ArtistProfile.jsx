import React, { useState, useEffect, useRef } from 'react';
import { loadArtist } from '../../services/artist';
import StarRating from './../../components/StarRating/StarRating';
import { updateAccountSettings } from '../../services/profile-settings';
import { Link } from 'react-router-dom';
import { followArtist } from '../../services/artist';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';

import './ArtistProfile.scss';

import settingsIcon from './cog.svg';
import editIcon from './pencil.svg';
import cameraIcon from './camera.svg';

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

  const isOwnProfile = props.match.params.id === props.user?._id;

  console.log(isOwnProfile);
  console.log(artist);

  // the dependency is necessary to make sure that the component is re-rendered
  // if user comes from another artist's profile
  useEffect(() => {
    getArtist();
  }, [props.match.params.id]);

  const getArtist = async () => {
    if (!isOwnProfile) {
      try {
        const artist = await loadArtist(props.match.params.id);
        setArtist(artist);
      } catch (error) {
        console.log(error);
      }
    } else {
      setArtist(props.user);
    }
  };

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
    <div className="ArtistProfileView">
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
      {isOwnProfile && (
        <button className="settings-btn" onClick={changeSettings}>
          <img src={settingsIcon} alt="settings" />
        </button>
      )}
      {isOwnProfile && (
        <button className={'sign-out-btn'} onClick={props.onSignOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#f5da00"
            viewBox="0 0 512 512"
          >
            <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
          </svg>
        </button>
      )}
      <div className="UserProfileView_header">
        <div>
          <div className="BackgroundImgAndButton">
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

            {isOwnProfile && (
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
        <div className="name-avatar-bio-wrapper">
          <div className="UserProfileView_avatar_wrap">
            {artist?.avatarUrl ? (
              <>
                <img
                  className="avatar-circle UserProfileView_avatar"
                  // src={'https://source.unsplash.com/random'}
                  src={artist?.avatarUrl}
                  alt={'avatar'}
                />
                {isOwnProfile && (
                  <Link className="avatar-change" to="/profile/upload-avatar">
                    <img src={cameraIcon} alt="edit" />
                  </Link>
                )}
                <h3 className="profile-name">
                  {artist?.firstName} {artist?.lastName}
                </h3>
              </>
            ) : (
              <>
                <div className="avatar-circle UserProfileView_avatar_text">
                  <span className="Profile-letters">
                    {artist?.firstName[0]}
                    {artist?.lastName[0]}
                  </span>
                </div>
                {isOwnProfile && (
                  <Link className="avatar-change" to="/profile/upload-avatar">
                    <img src={cameraIcon} alt="edit" />
                  </Link>
                )}
                <h3 className="profile-name">
                  {artist?.firstName} {artist?.lastName}
                </h3>
              </>
            )}
          </div>
          {(artist?.bio && <span>{artist.bio}</span>) || <span>No bio</span>}
        </div>

        <StarRating {...props} user={props.user} isLoggedIn={isLoggedIn} />

        <div className={'ArtistProfileView_follow'}>
          <div>{artist?.followerCount} followers</div>
          {!isOwnProfile && <button onClick={followNow}>follow</button>}
          {!isOwnProfile && <button>$ tip</button>}
        </div>
      </div>
      <div className={'UserProfileView_body'}>
        <div className={'UserProfileView_body_section'}>
          <div className={'EventsAndNew'}>
            <h3>Upcoming Events</h3>
            {isOwnProfile && (
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
