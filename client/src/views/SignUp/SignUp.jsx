import React, { useState } from 'react';

import { signUp } from '../../services/auth';

function SignUpView(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(name, email, password);
      const user = await signUp({ name, email, password });
      props.onAuthenticationChange(user);
    } catch (error) {
      console.log('Sign up error: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          type="name"
          placeholder="Your Name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
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
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpView;
