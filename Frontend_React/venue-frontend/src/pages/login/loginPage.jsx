import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { LOGIN } from '../../constants/queries'

import './loginPage.css';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [loginFunction, { data, loading, error }] = useMutation(LOGIN)

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`Logging in with email: ${email} and password: ${password}`);
    await loginFunction({ variables: { email, password } });
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-header">
          <h1>Login</h1>
        </div>
          <div className="form-body">
            <div className="form-control">
              <label>Email</label>
              <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
            </div>
            <div className="form-control">
              <label>Password</label>
              <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
            </div>
          </div>
          <div className="form-footer">
            <button type="submit">Login</button>
          </div>
      </div>

    </form>
  );
}

export default LoginPage;