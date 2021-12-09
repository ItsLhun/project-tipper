import React, { useState, useEffect } from 'react';
import { loadArtist, findEvents, findNowEvents } from '../../services/artist';
import { updateAccountSettings } from '../../services/profile-settings';
import { Link } from 'react-router-dom';
import { countFollow, followArtist } from '../../services/follow';
import GenreCheckbox from '../../components/GenreCheckbox/GenreCheckbox';
import { checkFollow } from '../../services/follow';
// import { checkRating } from '../../services/rating';
import EventMini from '../../components/ArtistEventMini/ArtistEventMini';

import './ArtistProfile.scss';

import settingsIcon from './cog.svg';
import cameraIcon from './camera.svg';
import signOutIcon from './sign-out.svg';

function ArtistProfileView(props) {
  const [artist, setArtist] = useState();
  const [editSettings, setEditSettings] = useState(false);
  const [email, setEmail] = useState(props.user?.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState(props.user?.bio);
  const [instruments, setInstruments] = useState(props.user?.instruments);
  const [genre, setGenre] = useState(props.user?.genre);
  const [follow, setFollow] = useState();
  // const [rating, setRating] = useState();
  const [count, setCount] = useState();
  const [events, setEvents] = useState([]);
  const [nowEvents, setNowEvents] = useState([]);

  const isOwnProfile = props.match.params.id === props.user?._id;

  // the dependency is necessary to make sure that the component is re-rendered
  // if user comes from another artist's profile
  useEffect(() => {
    getArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  const getArtist = async () => {
    if (!isOwnProfile) {
      try {
        const artist = await loadArtist(props.match.params.id);
        setArtist(artist);
        getCount(artist._id);
      } catch (error) {
        console.log(error);
      }
    } else {
      setArtist(props.user);
      getCount(props.user._id);
    }
  };

  const getCount = async (id) => {
    const count = await countFollow(id);
    setCount(count);
  };

  useEffect(() => {
    getEvents();
    getNowEvents();
    getFollow();
    // getRating();
    if (isOwnProfile) {
      setGenre([...props.user.genre]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFollow = async () => {
    try {
      const response = await checkFollow(props.match.params.id);
      if (response) {
        setFollow(true);
      } else {
        setFollow(false);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenreSelectionChange = (genre) => {
    setGenre(genre);
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
      await followArtist(artist?._id);
      setFollow((follow) => !follow);
      await countFollow(artist?._id);
      if (!follow) {
        setCount((count) => count + 1);
      } else {
        setCount((count) => count - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    try {
      const response = await findEvents(props.match.params.id);
      setEvents([response]);
    } catch (error) {
      console.log(error);
    }
  };

  const getNowEvents = async () => {
    try {
      const response = await findNowEvents(props.match.params.id);
      setNowEvents([response]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ArtistProfileView">
      <div>
        {editSettings && (
          <form
            className="UserProfileView_body_section"
            onSubmit={handleSubmit}
          >
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
                  value={props.user?.bio || bio}
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
                  options={props.definedGenres}
                  selected={genre || props.user?.genre}
                  onSelectedChange={handleGenreSelectionChange}
                />
              </div>
            </div>

            <button className="save-changes-btn general-btn">
              Save Changes
            </button>
          </form>
        )}
        {isOwnProfile && (
          <button className="settings-btn top-icon" onClick={changeSettings}>
            <img src={settingsIcon} alt="settings" />
          </button>
        )}
        {isOwnProfile && (
          <button className="sign-out-btn top-icon" onClick={props.onSignOut}>
            <img src={signOutIcon} alt="sign out" />
          </button>
        )}
        <div className="UserProfileView_header">
          <div className="BackgroundImgAndButton">
            {artist?.backgroundImg ? (
              <img
                className="Background"
                src={artist.backgroundImg}
                alt="Artist pic"
              />
            ) : (
              <img
                className="Background"
                src={'https://source.unsplash.com/random/?musician'}
                alt="random musician"
              />
            )}
            {isOwnProfile && (
              <Link to="/artist/upload-background" className="background-btn">
                <img src={cameraIcon} alt="upload" />
              </Link>
            )}
          </div>

          <div className="name-avatar-bio-wrapper">
            <div className="UserProfileView_avatar_wrap">
              {artist?.avatarUrl ? (
                <>
                  <img
                    className="avatar-circle UserProfileView_avatar"
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
            {(artist?.bio && <em>{artist.bio}</em>) || <em></em>}
            {artist?.instruments && <em>Instruments: {artist.instruments}</em>}
            {artist?.genre && <em>Genres: {artist.genre}</em>}
          </div>

          {/* <StarRating {...props} user={props.user} isLoggedIn={isLoggedIn} /> */}

          <div className={'ArtistProfileView_follow'}>
            <div>
              <span>{count}</span>
              <span>{count === 1 ? 'follower' : 'followers'}</span>
            </div>
            {!isOwnProfile && follow && (
              <button className="unfollow-btn" onClick={followNow}>
                unfollow
              </button>
            )}
            {!isOwnProfile && !follow && (
              <button className="follow-btn artist-btn" onClick={followNow}>
                follow
              </button>
            )}
            {!isOwnProfile && (
              <button className="artist-btn">
                <Link to={`/artist/${artist?._id}/tip`}>$ tip 🤑</Link>
              </button>
            )}
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
            {events && (
              <EventMini
                {...props}
                events={events}
                nowEvents={nowEvents}
                isOwnProfile={isOwnProfile}
                onDeleteEvent={getEvents}
              />
            )}
            {!events && <p>No events yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistProfileView;
