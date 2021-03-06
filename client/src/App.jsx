import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import ProtectedRoute from './components/ProtectedRoute';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';
import { Helmet } from 'react-helmet';

// Views
import SignInView from './views/SignIn/SignIn';
import { signOut, loadAuthenticatedUser } from './services/auth';
import SplitUsersView from './views/SplitUsers/SplitUsers';
import SignUpView from './views/SignUp/SignUp';
import ArtistSignUpView from './views/ArtistSignUp/ArtistSignUp';
import UserProfileView from './views/UserProfile/UserProfile';
import ArtistProfileView from './views/ArtistProfile/ArtistProfile';
import TipArtistView from './views/TipArtist/TipArtist';
import HomeView from './views/Home/Home';
import EventDetail from './views/Event/Detail';
import CreateEventView from './views/Event/Create';
import EventEdit from './views/Event/Edit';
import EventList from './views/Event/List';
import HomeUnauthView from './views/HomeUnauth/HomeUnauth';
import UploadAvatarView from './views/UploadAvatar/UploadAvatar';
import ExploreView from './views/Explore/Explore';
import SearchListView from './views/SearchList/SearchList';
import UploadArtistBackgroundView from './views/UploadArtistBackground/UploadArtistBackground';

// Services
import { updateLastLocation } from './services/auth';

import './App.scss';

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries: ['places']
  });

  let geocoder = null;
  if (isLoaded) {
    geocoder = new window.google.maps.Geocoder();
    console.log(geocoder);
  }

  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      if (pos) {
        setUserLocation(pos);
        updateLastLocation({ location: pos })
          .then(() => {
            console.log('updated last location');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUserLocation({
          lat: 37.773972,
          lng: -122.431297
        });
      }
    });
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await loadAuthenticatedUser();
      if (user) {
        setUser(user);
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        if (pos) {
          setUserLocation(pos);
          updateLastLocation({ location: pos })
            .then(() => {
              console.log('updated last location');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setUserLocation({
            lat: 37.773972,
            lng: -122.431297
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoaded(true);
  };

  const signOutHandler = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>Tipper</title>
        <meta
          property="og:title"
          content="Tipper"
          key="title"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="Tipper is a social network for musicians and fans. Find events near you, tip artists, and share your favorite music."
          key="description"
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/ItsLhun/project-tipper/master/client/public/screens.jpg"
          key="image"
          data-react-helmet="true"
        />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_API_URL}/`}
          key="url"
          data-react-helmet="true"
        />
        <meta
          property="og:type"
          content="website"
          key="type"
          data-react-helmet="true"
        />
        <meta
          property="og:site_name"
          content="Tipper"
          key="site_name"
          data-react-helmet="true"
        />
      </Helmet>

      <Switch>
        <Route
          path="/"
          render={(props) => {
            return user ? (
              <HomeView
                {...props}
                user={user}
                definedGenres={genres}
                userLocation={userLocation}
              />
            ) : (
              <HomeUnauthView {...props} />
            );
          }}
          exact
        />
        <Route
          path="/events"
          render={(props) => <EventList {...props} user={user} />}
          exact
        />
        <ProtectedRoute
          path="/event/create"
          authorized={!loaded || user}
          redirect="/"
          render={(props) => (
            <CreateEventView
              {...props}
              onAuthenticationChange={setUser}
              definedGenres={genres}
              userLocation={userLocation}
              isLoaded={isLoaded}
              geocoder={geocoder}
            />
          )}
          exact
        />
        <ProtectedRoute
          path="/event/edit/:id"
          authorized={!loaded || user}
          redirect="/"
          render={(props) => (
            <EventEdit {...props} onAuthenticationChange={setUser} />
          )}
          exact
        />
        <Route
          path="/event/:id"
          render={(props) => <EventDetail {...props} user={user} />}
          exact
        />
        <ProtectedRoute
          path="/split"
          authorized={!loaded || !user}
          redirect="/"
          render={(props) => (
            <SplitUsersView {...props} onAuthenticationChange={setUser} />
          )}
          exact
        />
        <ProtectedRoute
          path="/sign-up"
          authorized={!loaded || !user}
          redirect="/"
          render={(props) => (
            <SignUpView {...props} onAuthenticationChange={setUser} />
          )}
          exact
        />
        <ProtectedRoute
          path="/artist-sign-up"
          authorized={!loaded || !user}
          redirect="/"
          render={(props) => (
            <ArtistSignUpView {...props} onAuthenticationChange={setUser} />
          )}
          exact
        />
        <ProtectedRoute
          path="/sign-in"
          authorized={!loaded || !user}
          redirect="/"
          render={(props) => (
            <SignInView {...props} onAuthenticationChange={setUser} />
          )}
          exact
        />
        <ProtectedRoute
          path="/profile"
          authorized={!loaded || user}
          redirect="/"
          render={(props) => {
            return (
              // (user?.role === 'defaultUser' && (
              <UserProfileView
                {...props}
                user={user}
                onSignOut={signOutHandler}
                onUserRefresh={loadUser}
              />
              // )) || (
              //       <ArtistProfileView
              //         {...props}
              //         user={user}
              //         onSignOut={signOutHandler}
              //       />
              //     )
            );
          }}
          exact
        />
        <Route
          path="/explore"
          render={(props) => (
            <ExploreView
              {...props}
              userLocation={userLocation}
              onUserRefresh={loadUser}
            />
          )}
        />
        <Route
          path="/search"
          render={(props) => (
            <SearchListView
              {...props}
              definedGenres={genres}
              userLocation={userLocation}
              isLoaded={isLoaded}
              geocoder={geocoder}
            />
          )}
        />
        {/*
        Removing protection for now 
        <ProtectedRoute
          path="/search"
          authorized={!loaded || user}
          redirect="/"
          render={(props) => <SearchView />}
          exact
        /> */}
        <Route
          path="/profile/upload-avatar"
          authorized={loaded || user}
          redirect="/"
          render={(props) => <UploadAvatarView {...props} user={user} />}
        />
        <ProtectedRoute
          path="/artist/upload-background"
          authorized={loaded || user}
          redirect="/"
          render={(props) => (
            <UploadArtistBackgroundView {...props} user={user} />
          )}
          exact
        />

        <ProtectedRoute
          path="/artist/:id"
          authorized={!loaded || user}
          redirect="/"
          render={(props) => (
            <ArtistProfileView
              {...props}
              user={user}
              onSignOut={signOutHandler}
              definedGenres={genres}
              onUserRefresh={loadUser}
            />
          )}
          exact
        />
        <ProtectedRoute
          path="/artist/:id/tip"
          authorized={!loaded || user}
          redirect="/"
          render={(props) => (
            <TipArtistView
              {...props}
              user={user}
              definedGenres={genres}
              onUserRefresh={loadUser}
            />
          )}
          exact
        />
      </Switch>
      <BottomNavbar user={user} onSignOut={signOutHandler} />
    </div>
  );
}

export default App;
