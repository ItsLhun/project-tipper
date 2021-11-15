import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../../services/auth';

function SignInView(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn({ email, password });
      props.onAuthenticationChange(user);
    } catch (error) {
      console.log('Log in error: ', error);
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
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          placeholder="Your Email"
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
        <button>Sign In</button>
      </form>
      <p>
        No account yet?{' '}
        <Link to="/sign-up">
          <span>Sign Up</span>
        </Link>
      </p>
    </div>
  );
}

export default SignInView;
