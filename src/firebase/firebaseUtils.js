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

// --------------------------------------------------------------------------------------------

//following function would take userAuth object that we are getting from our auth liabrary and then store it into our database.
export const createUserProfileDocument = async (
  userAuth,
  additionalProperties
) => {
  //if user sign out then there is no userAuth object then we want to return from this function.
  if (!userAuth) return;

  //if userAuth exists then we want to query inside of firestore to see if the user data already exists or is it a new user.
  //we get queryReference object either by firestore.doc('/users/:userId') or firestore.collections('/users')
  //queryReference will give us properties like id,path,parent;
  // const userRef = firestore.doc('users/3351323adfd');
  // instead of hardcoded user Id entered above we want to pass uid of userAuth object from auth liabrary

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  //we will get back the user reference at userAuth.uid location and then we will get a snapshot and using that snapshot we're going to figure out whether or not we have stored this user object that we have authenticated.

  //to get querySnapshot object from above queryReference object we use get method as following
  //querySnapshot will give us actual details of our user that we want to save in db.
  const querySanpshot = await userRef.get();
  console.log('querySnapshot', querySanpshot);
  //here we see that the exists: property in snapshot object is false which states that the user data is not present in our database but the id is same as we see in firebase authentication liabrary.

  //using this snapshot.exists property we will check if it does not exists then we will create piece of data that we want to save to our database.
  //to create data we will use .set() method on our documentReference object.

  if (!querySanpshot.exists) {
    //getting displayName and email from userAuth object;
    const { displayName, email } = userAuth;
    //creating time stamp to keep a record when this data was created;
    const createdAt = new Date();

    //creating data using document reference object
    // this data will be saved in our data base.
    // if snapshot.exists:false then the code in try block will create a user with following details.
    // if there is any error it would be console.log using catch block.
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalProperties,
      });
    } catch (err) {
      console.log('error creating user data', err.message);
    }
  }
  return userRef;
};

// ---------------------------------------------------------------------------------------------

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
