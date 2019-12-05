import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyB449UKwV4yK-oJui8CHwjZr1X2oFXWuXk",
    authDomain: "wireframe-2d2b2.firebaseapp.com",
    databaseURL: "https://wireframe-2d2b2.firebaseio.com",
    projectId: "wireframe-2d2b2",
    storageBucket: "wireframe-2d2b2.appspot.com",
    messagingSenderId: "1096792452935",
    appId: "1:1096792452935:web:620159eafdcdb20af52662"
  };
 
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;