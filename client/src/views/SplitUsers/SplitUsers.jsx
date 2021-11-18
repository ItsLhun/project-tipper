import React from 'react';

import { Link } from 'react-router-dom';

function SplitUsersView() {
  return (
    <div>
      <h1>Welcome</h1>
      {/* Make users select between player or listener */}
      <div className="split-users-container">
        <p>I am a ...</p>

        <Link to="/sign-up">Listener</Link>
        <br />
        <Link to="/artist-sign-up">Player</Link>
      </div>
    </div>
  );
}

export default SplitUsersView;
