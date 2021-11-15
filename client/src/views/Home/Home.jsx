import React from 'react';

function HomeView(props) {
  return (
    <div>
      <h1>Home Signed in</h1>
      <p>Hello {props.user.firstName}</p>
    </div>
  );
}

export default HomeView;
