import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './App.css';
import {selectUser, login, logout} from './features/userSlice';
import {auth} from './firebase';
import Login from './Login';
import Messenger from './Messenger';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        // user logged out
        dispatch(logout());
      }
    });
  }, []);

  return <div className='app'>{user ? <Messenger /> : <Login />}</div>;
}

export default App;
