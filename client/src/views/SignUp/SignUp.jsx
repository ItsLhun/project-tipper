import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../services/auth';

import './SignUp.scss';

function SignUpView(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp({ firstName, lastName, email, password });
      props.onAuthenticationChange(user);
    } catch (error) {
      console.log('Sign up error: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="SignUpViewOutter">
      <div>
        <h1>Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className={'CreateEventView_content_form'}
        >
          <div className={'CreateEventView_inputs'}>
            <label htmlFor="input-name">First Name</label>
            <input
              id="input-first-name"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
            />
            <label htmlFor="input-name">Last Name</label>
            <input
              id="input-last-name"
              type="text"
              placeholder="Last name"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
            />
            <label htmlFor="input-email">Email</label>
            <input
              id="input-email"
              type="email"
              placeholder="your@email.com"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <label htmlFor="input-password">Password</label>
            <input
              id="input-password"
              type="password"
              placeholder="A Secure Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button className={'event-btn'}>Sign Up</button>
        </form>

        <br />
        <p>Already have an account?</p>
        <Link to="/sign-in">
          <button className={'event-btn'}>Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default SignUpView;
