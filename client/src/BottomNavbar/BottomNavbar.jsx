import React from 'react';
import { Link } from 'react-router-dom';

import './BottomNavbar.scss';

function BottomNavbar(props) {
  return (
    <div className={'BottomNavbar'}>
      <Link to="/" className="button">
        <div className="button-wrapper">
          <span className="circle" />
          Home
        </div>
      </Link>
      <Link to="/" className="button">
        <div className="button-wrapper">
          <span className="circle" />
          Search
        </div>
      </Link>
      <Link to={(props.user && '/profile') || '/sign-in'} className="button">
        <div className="button-wrapper">
          <span className="circle" />
          {props.user ? 'Profile' : 'Sign In'}
        </div>
      </Link>
      {props.user?.role === 'artist' && (
        <Link to="/" className="button">
          <div className="button-wrapper">
            <span className="circle circle-live" />
            Go Live
          </div>
        </Link>
      )}
    </div>
  );
}

export default BottomNavbar;
