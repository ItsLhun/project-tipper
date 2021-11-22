import React from 'react';

import { Link } from 'react-router-dom';

import './SplitUsers.scss';

function SplitUsersView() {
  return (
    <div className={'CreateEventView'}>
      <h1>Welcome</h1>
      {/* Make users select between player or listener */}
      <div className="split-users-container">
        <p>I am a ...</p>

        <div className={'SplitUser'}>
          <Link to="/sign-up">
            <button className={'event-btn'}>Listener</button>
          </Link>

          <Link to="/artist-sign-up">
            <button className={'event-btn'}>Player</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SplitUsersView;
