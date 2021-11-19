import React, { useState } from 'react';
import TransactionListItem from '../../components/Transactions/TransactionListItem';
import { Link } from 'react-router-dom';
import { updateAccountSettings } from '../../services/profile-settings';

import './UserProfile.scss';

const transaction = {
  id: '1',
  amount: '$5',
  date: '12/12/2019',
  concept: 'Tip to Nick Lager'
};

function UserProfileView(props) {
  // const [transactions, setTransactions] = useState(null);
  const [email, setEmail] = useState(props.user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccountSettings({ email, password, confirmPassword });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={'UserProfileView'}>
      <button className={'sign-out-btn'} onClick={props.onSignOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
        </svg>
      </button>
      <div className={'UserProfileView_header'}>
        {props.user?.avatarUrl ? (
          <img
            className={'UserProfileView_avatar'}
            // src={'https://source.unsplash.com/random'}
            src={props.user?.avatarUrl}
            alt={'avatar'}
          />
        ) : (
          <div className={'UserProfileView_avatar_text'}>
            <span className="Profile-letters">
              {props.user?.firstName[0]}
              {props.user?.lastName[0]}
            </span>
          </div>
        )}

        <Link to="/profile/upload-avatar">
          <button className={'avatar-btn'}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <path
                    d="M403.914,0L54.044,349.871L0,512l162.128-54.044L512,108.086L403.914,0z M295.829,151.319l21.617,21.617L110.638,379.745
			l-21.617-21.617L295.829,151.319z M71.532,455.932l-15.463-15.463l18.015-54.043l51.491,51.491L71.532,455.932z M153.871,422.979
			l-21.617-21.617l206.809-206.809l21.617,21.617L153.871,422.979z M382.297,194.555l-64.852-64.852l21.617-21.617l64.852,64.852
			L382.297,194.555z M360.679,86.468l43.234-43.235l64.853,64.853l-43.235,43.234L360.679,86.468z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </Link>

        <h3 className="Profile-name">
          {`${props.user?.firstName} ${props.user?.lastName}`}
        </h3>
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
            {/* Map to transactions array goes here, limit to last 10*/}
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
          <p>See more...</p>
        </div>
        <form className="UserProfileView_body_section" onSubmit={handleSubmit}>
          <h4 className="UserProfileView_body_section_title">ACCOUNT</h4>
          <div className="UserProfileView_body_section_content">
            <div className="UserProfileView_body_section_content_inputs">
              <span>Email:</span>
              <input
                //   This change is needed to prevent error of setting state to undefined
                value={props.user?.email || email}
                type="text"
                id="email-input"
                name="email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="UserProfileView_body_section_content_inputs">
              <span>Password:</span>
              <input
                value={password}
                type="password"
                id="password-input"
                name="password"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="UserProfileView_body_section_content_inputs">
              <span>Confirm Password:</span>
              <input
                value={confirmPassword}
                type="password"
                id="password-confirm-input"
                name="confirmPassword"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button className="save-changes-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default UserProfileView;
