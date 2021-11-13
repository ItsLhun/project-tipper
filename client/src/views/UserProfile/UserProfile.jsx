import React from 'react';

import './UserProfile.scss';

function UserProfileView(props) {
  return (
    <div className={'UserProfileView'}>
      <div className={'UserProfileView_header'}>
        {false /* props.user?.avatarUrl  */ ? (
          <img
            className={'UserProfileView_avatar'}
            src={'https://source.unsplash.com/random'}
            // src={props.user?.avatarUrl}
            alt={'avatar'}
          />
        ) : (
          <div className={'UserProfileView_avatar_text'}>
            {/* {props.user?.firstName?.[0]} */}
            {/* {props.user?.lastName?.[0]} */}
            <span className="Profile-letters">
              <span>{'N'}</span>
              <span>{'L'}</span>
            </span>
          </div>
        )}
        <h3 className="Profile-name">Nick Lager</h3>
      </div>
      <div className={'UserProfileView_body'}>
        <div className={'UserProfileView_body_section'}>
          <h4 className={'UserProfileView_body_section_title'}>
            {'PAYMENT INFO'}
          </h4>
          <div className={'UserProfileView_body_section_content'}></div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileView;
