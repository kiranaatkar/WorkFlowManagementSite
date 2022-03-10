import './Login.css';
import './Form.css';
import React from 'react';
import Networking from './Networking.js';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Input from './Input';
import { useState } from 'react';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [valid, setValid] = useState(true);
  const myAPI = new Networking();

  async function onSubmit(e) {
    e.preventDefault();
    if (email && password) {
      const response = await myAPI.login(email, password);
      if (response.status === 200) {
        props.logInOut();
        setRedirect(true);
      } else {
        setValid(false);
        setErrorMsg('ERROR: ' + response.json.msg);
      }
    }
  }

  return (
    <div>
      {redirect ? (
        <Navigate to='/dashboard' />
      ) : (
        <div className='login-form-wrapper'>
          <h2>Log in</h2>
          <form
            onSubmit={async (e) => await onSubmit(e)}
            className='login-form'>
            <Input
              change={(e) => setEmail(e.target.value)}
              id='email'
              value={email}
              type='text'
            />
            <Input
              change={(e) => setPassword(e.target.value)}
              id='password'
              value={password}
              type='password'
            />
            <button
              onClick={async (e) => await onSubmit(e)}
              className='form-btn btn submit'>
              Log in
            </button>
            <h5>
              Don't have an account?{' '}
              <Link to='/createAccount' className='sign-up'>
                {' '}
                Sign up
              </Link>
            </h5>
            <h3 className='error-msg'>{!valid ? errorMsg : ''}</h3>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
