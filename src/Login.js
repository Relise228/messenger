import {Button} from '@material-ui/core';
import {auth, provider} from './firebase';
import React from 'react';
import './Login.css';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className='login'>
      <div className='login__logo'>
        <img
          src='https://corp.imgsmail.ru/media/images/imlogo_3jiFVFl.png'
          alt='Logo messenger'
        />
        <h1>Messenger</h1>
      </div>
      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
}

export default Login;
