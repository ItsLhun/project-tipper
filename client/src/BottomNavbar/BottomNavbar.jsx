import React from 'react';
import { Link } from 'react-router-dom';

import './BottomNavbar.scss';

function BottomNavbar(props) {
  return (
    <div className={'BottomNavbar'}>
      <div className="button-wrapper">
        <span className="circle" />
        <Link to="/" className="button">
          Home
        </Link>
      </div>
      <div className="button-wrapper">
        <span className="circle" />
        <Link to="/" className="button">
          Search
        </Link>
      </div>
      <div className="button-wrapper">
        <span className="circle" />
        {(props.user && (
          <Link to="/profile" className="button">
            Profile
          </Link>
        )) || (
          <Link to="/sign-in" className="button">
            {' '}
            Sign In{' '}
          </Link>
        )}
      </div>
    </div>
  );
}

export default BottomNavbar;
