//specifically importing util liabraries that we need
import firebase from 'firebase/compat/app';
//we always need base import that is firebase as above.
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// on creating new project at firebase we get following config object to include in our code
const config = {
  apiKey: 'AIzaSyCmWjpCd6KxIoBkEQjVoNk8LxYzEyApY7s',
  authDomain: 'crwn-clothing-5e709.firebaseapp.com',
  projectId: 'crwn-clothing-5e709',
  storageBucket: 'crwn-clothing-5e709.appspot.com',
  messagingSenderId: '596681508091',
  appId: '1:596681508091:web:b63870eaebd69e9e0d5c5e',
  measurementId: 'G-33N6NWC0G1',
};

//initialising project with firebase config object
firebase.initializeApp(config);

//exporting authentication functionality
export const auth = firebase.auth();
//exporting storage functionality
export const firestore = firebase.firestore();

//setting up sign in with google authentication

//provider gives access to google auth provider class under authentication liabrary
const provider = new firebase.auth.GoogleAuthProvider();

//setCustomParameters helps us set up prompt to select google account for authentication
provider.setCustomParameters({ prompt: 'select_account' });

//signInWithGoogle helps generate the popup for google accounts. There are multiple popups for various accounts such as twitter etc. Following one is for google accounts.
// enable Google OAuth at firebase website for our project.
//signInWithGoogle method will be used inside of our SignIn component for using Google OAuth enabled for our project. Like this we tied authentication with google into our application.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//export entire liabrary in case we need it.
export default firebase;
