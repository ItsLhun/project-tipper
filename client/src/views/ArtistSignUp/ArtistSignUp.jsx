import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../services/auth';

function ArtistSignUpView(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp({
        firstName,
        lastName,
        email,
        password,
        role: 'artist'
      });
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
    <div>
      <h1>Artist Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-name">Name</label>
        <input
          id="input-first-name"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="input-name">Name</label>
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
        <button>Sign Up</button>

        <p>
          Already have an account?{' '}
          <Link to="/sign-in">
            <span>Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ArtistSignUpView;
