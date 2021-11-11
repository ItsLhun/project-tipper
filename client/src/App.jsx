import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { signOut, loadAuthenticatedUser } from './services/auth';

import SignInView from './views/SignIn/SignIn';
import SignUpView from './views/SignUp/SignUp';
import HomeView from './views/Home/Home';

import './App.css';

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
          render={(props) => <HomeView {...props} user={user} />}
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
      </Switch>
      Hello {user?.name}
      <Link to="/">
        <span>Home</span>
      </Link>
      <Link to="/sign-up">
        <span>Sign Up</span>
      </Link>
      <Link to="/sign-in">
        <span>Sign In</span>
      </Link>
      {user && <button onClick={signOutHandler}>Sign Out</button>}
    </div>
  );
}

export default App;
