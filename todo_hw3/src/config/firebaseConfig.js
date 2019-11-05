import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
 var firebaseConfig = {
    apiKey: "AIzaSyAMI5UtzGZsLh0wZW3x12BOzJ-IdGU0UoM",
    authDomain: "todo-hw3-3d807.firebaseapp.com",
    databaseURL: "https://todo-hw3-3d807.firebaseio.com",
    projectId: "todo-hw3-3d807",
    storageBucket: "todo-hw3-3d807.appspot.com",
    messagingSenderId: "69756034035",
    appId: "1:69756034035:web:a9e39ba900b2515f5b5086",
    measurementId: "G-1KXJLR58X4"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;