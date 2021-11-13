import React from 'react';
import TransactionListItem from '../../components/Transactions/TransactionListItem';

import './UserProfile.scss';

const transaction = {
  id: '1',
  amount: '$100',
  date: '12/12/2019',
  concept: 'Tip to Nick Lager'
};

function UserProfileView(props) {
  return (
    <div className={'UserProfileView'}>
      <button className={'sign-out-btn'} onClick={props.onSignOut}>
        Sign Out
      </button>
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
          <h4 className={'UserProfileView_body_section_title'}>PAYMENT INFO</h4>
          <div className={'UserProfileView_body_section_content'}>
            Card: **** **** **** ****
          </div>
        </div>
        <div className="UserProfileView_body_section">
          <h4 className="UserProfileView_body_section_title">TRANSACTIONS</h4>
          <div className="UserProfileView_body_section_content">
            <div className="UserProfileView_transactions">
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
              <TransactionListItem transaction={transaction} />
            </div>
          </div>
        </div>
        <div className={'UserProfileView_body_section'}>
          <h4 className={'UserProfileView_body_section_title'}>ACCOUNT</h4>
          <div className={'UserProfileView_body_section_content'}>
            content goes here
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileView;
