import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
  apiKey: "AIzaSyDGQsTbuvbHSnCd968YEWO3juw8TXDZyhU",
  authDomain: "test-7930c.firebaseapp.com",
  databaseURL: "https://test-7930c.firebaseio.com",
  projectId: "test-7930c",
  storageBucket: "test-7930c.appspot.com",
  messagingSenderId: "182926058916",
  appId: "1:182926058916:web:7cd336dd86edae14af4d31"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;