import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './BottomNavbar.scss';

function BottomNavbar(props) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeClass, setActiveClass] = useState('');

  const handlePathChange = () => {
    console.log(currentPath);
    const { pathname } = window.location;
    setCurrentPath(pathname);

    switch (pathname) {
      case '/':
        return setActiveClass('active-home');
      case '/profile':
        return setActiveClass('active-profile');
      case '/search':
        return setActiveClass('active-search');
      default:
        return '';
    }
  };

  useEffect(() => {
    handlePathChange();
  });

  return (
    <div className={`BottomNavbar ${activeClass}`} onClick={handlePathChange}>
      <Link to="/" className="button">
        <div className="button-wrapper">
          <span className="circle" />
          <span>Home</span>
        </div>
      </Link>
      <Link to="/" className="button">
        <div className="button-wrapper">
          <span className="circle" />
          <span>Search</span>
        </div>
      </Link>
      <Link to={(props.user && '/profile') || '/sign-in'} className="button">
        <div className="button-wrapper">
          <span className="circle" />
          <span>{props.user ? 'Profile' : 'Sign In'}</span>
        </div>
      </Link>
      {/* {props.user?.role === 'artist' && (
        <Link to="/" className="button">
          <div className="button-wrapper">
            <span className="circle circle-live" />
            Go Live
          </div>
        </Link>
      )} */}
    </div>
  );
}

export default BottomNavbar;
