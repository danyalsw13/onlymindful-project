import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions'
import { getAnalytics } from "firebase/analytics";

//key for logging into firebase 
const firebaseConfig = {
    apiKey: "AIzaSyAzQjOd8pQvGUYC20AMVpANwuI7ljTkDzg",
    authDomain: "onlymindful-project.firebaseapp.com",
    projectId: "onlymindful-project",
    storageBucket: "onlymindful-project.appspot.com",
    messagingSenderId: "1075424774332",
    appId: "1:1075424774332:web:866a5075f4759a119028b9",
    measurementId: "G-PZ808T9HVS"
  };

  //Get Authentication of this portion
  //to get up and running

//this line will initialize the application
const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = firebaseApp.firestore();


const auth = firebase.auth();

const functions = firebase.functions();

const provider = new firebase.auth.GoogleAuthProvider();

export {functions}

export {auth, provider};

export {analytics};

export default db;

