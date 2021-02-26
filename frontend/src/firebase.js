import firebase from 'firebase/app';
import 'firebase/firestore';

let config = {
  apiKey: 'AIzaSyBR5Udyrwe7vwHQHhKnHtejPMSkYhqJ4NQ',
  authDomain: 'picker-app-2cc6e.firebaseapp.com',
  databaseURL: 'https://picker-app-2cc6e-default-rtdb.firebaseio.com',
  projectId: 'picker-app-2cc6e',
  storageBucket: 'picker-app-2cc6e.appspot.com',
  messagingSenderId: '923117820694',
  appId: '1:923117820694:web:847f20bd04a43aa02d8e37',
  measurementId: 'G-1MD9BCVF0Y',
};

firebase.initializeApp(config);

export default firebase.firestore();
