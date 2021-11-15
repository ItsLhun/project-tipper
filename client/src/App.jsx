import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { signOut, loadAuthenticatedUser } from './services/auth';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

import SignInView from './views/SignIn/SignIn';
import SignUpView from './views/SignUp/SignUp';
import UserProfileView from './views/UserProfile/UserProfile';
import HomeView from './views/Home/Home';
import HomeUnsignedView from './views/HomeUnsigned/HomeUnsigned';

import EventView from './views/Event/Event';
import UploadAvatarView from './views/UploadAvatar/UploadAvatar';
import BottomNavbar from './BottomNavbar/BottomNavbar';

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
              <HomeUnsignedView {...props} />
            );
          }}
          exact
        />
        <Route
          path="/event"
          render={(props) => <EventView {...props} user={user} />}
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
          render={(props) => (
            <UserProfileView
              {...props}
              user={user}
              onSignOut={signOutHandler}
            />
          )}
          exact
        />
        <Route
          path="/profile/upload-avatar"
          authorized={!loaded || user}
          redirect="/"
          render={(props) => <UploadAvatarView {...props} user={user} />}
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
