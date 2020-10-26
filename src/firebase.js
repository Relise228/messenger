import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBC5VAVaGaLj5IXOLNgOheTQlLINo9Tq9Y',
  authDomain: 'messenger-b12a2.firebaseapp.com',
  databaseURL: 'https://messenger-b12a2.firebaseio.com',
  projectId: 'messenger-b12a2',
  storageBucket: 'messenger-b12a2.appspot.com',
  messagingSenderId: '103798810457',
  appId: '1:103798810457:web:76c1c482863d25e5da8e48',
  measurementId: 'G-4ESED4K25Z',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
