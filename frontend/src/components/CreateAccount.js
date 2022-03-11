import './Login.css';
import './Form.css';
import React from 'react';
import Networking from './Networking.js';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Input from './Input';
import { useState } from 'react';

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [valid, setValid] = useState(true);
  const myAPI = new Networking();

  async function onSubmit(e) {
    e.preventDefault();
    if (email && password && confirmation) {
      const response = await myAPI.createAccount(email, password, confirmation);
      if (response.status === 200) {
        setRedirect(true);
      } else {
        setErrorMsg(response.json.message);
        setValid(false);
      }
    }
  }

  return (
    <div>
      {redirect ? (
        <Navigate to='/dashboard' />
      ) : (
        <div className='account-form-wrapper'>
          <h2>Create Account</h2>
          <form
            onSubmit={async (e) => await onSubmit(e)}
            className='account-form'>
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
            <Input
              change={(e) => setConfirmation(e.target.value)}
              id='confirmation'
              value={confirmation}
              type='password'
            />
            <button
              onClick={async (e) => await onSubmit(e)}
              className='form-btn btn submit'>
              Create Account
            </button>
            <h5>
              Already have an account?{' '}
              <Link to='/login' className='create-acc'>
                {' '}
                Log in
              </Link>
            </h5>
            <h3 className='error-msg'>{!valid ? errorMsg : ''}</h3>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
