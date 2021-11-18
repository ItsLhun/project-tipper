import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { signOut, loadAuthenticatedUser } from './services/auth';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import SplitUsersView from './views/SplitUsers/SplitUsers';
import SignInView from './views/SignIn/SignIn';
import SignUpView from './views/SignUp/SignUp';
import ArtistSignUpView from './views/ArtistSignUp/ArtistSignUp';
import UserProfileView from './views/UserProfile/UserProfile';
import ArtistProfileView from './views/ArtistProfile/ArtistProfile';
import HomeView from './views/Home/Home';
import EventDetail from './views/Event/Detail';
import EventCreate from './views/Event/Create';
import EventEdit from './views/Event/Edit';
import EventList from './views/Event/List';
import HomeUnauthView from './views/HomeUnauth/HomeUnauth';
import UploadAvatarView from './views/UploadAvatar/UploadAvatar';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';
import SearchView from './views/Search/Search';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await loadAuthenticatedUser();
      if (user) {
        setUser(user);
      }
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
      <Switch>
        <Route
          path="/"
          render={(props) => {
            return user ? (
              <HomeView {...props} user={user} />
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
            <EventCreate {...props} onAuthenticationChange={setUser} />
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
              (user?.role === 'defaultUser' && (
                <UserProfileView
                  {...props}
                  user={user}
                  onSignOut={signOutHandler}
                />
              )) || (
                <ArtistProfileView
                  {...props}
                  user={user}
                  onSignOut={signOutHandler}
                />
              )
            );
          }}
          exact
        />
        <Route path="/search" render={(props) => <SearchView {...props} />} />
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
        <Route
          path="/artist/mick"
          render={(props) => <ArtistProfileView {...props} user={user} />}
          exact
        />
      </Switch>
      <BottomNavbar user={user} onSignOut={signOutHandler} />
      <Link to="/profile/upload-avatar">
        {user && (
          <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_NAME}>
            <Image publicId="user_blxuay.png">
              <Transformation width="20" crop="scale" />
            </Image>
          </CloudinaryContext>
        )}
      </Link>
    </div>
  );
}

export default App;
