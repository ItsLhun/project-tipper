import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './BottomNavbar.scss';

function BottomNavbar(props) {
  const [activeClass, setActiveClass] = useState('');

  const handlePathChange = () => {
    const { pathname } = window.location;
    switch (pathname) {
      case '/':
        return setActiveClass('active-home');
      case '/profile':
        if (props.user?.role === 'artist') {
          return setActiveClass('active-profile-artist');
        } else {
          return setActiveClass('active-profile');
        }
      case '/event/create':
      case '/event/edit':
        return setActiveClass('active-home');
      case '/explore':
        return setActiveClass('active-explore');
      default:
        return setActiveClass('active-home');
    }
  };

  useEffect(() => {
    handlePathChange();
  });

  return (
    <div className={`BottomNavbar ${activeClass}`} onClick={handlePathChange}>
      <div>
        <Link to="/" className="button">
          <div className="button-wrapper">
            <span className="circle" />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/explore" className="button">
          <div className="button-wrapper">
            <span className="circle" />
            <span>Explore</span>
          </div>
        </Link>
        <Link
          to={
            (props.user?.role === 'defaultUser' && '/profile') ||
            (props.user?.role === 'artist' && `/artist/${props.user._id}`) ||
            '/sign-in'
          }
          className="button"
        >
          <div className="button-wrapper">
            <span className="circle" />
            <span>{props.user ? 'Profile' : 'Sign In'}</span>
          </div>
        </Link>
        {props.user?.role === 'artist' && (
          <Link to="/event/create" className="button">
            <div className="button-wrapper">
              <span className="circle circle-live" />
              Go Live
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default BottomNavbar;
