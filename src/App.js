import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import Header from './components/Header/Header';
import SignInAndSignUp from './pages/SignInAndSignUpPage/SignInAndSignUp';
import { auth } from './firebase/firebaseUtils';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //we want firebase to know when the user authentication state has changed
    // that is when the user is logged in or logged out
    //firebase does that with auth.onAuthStateChanged()
    //auth.onAuthStateChanged() is a method that takes a callback function whose parameter is user state of the auth on our firebase project
    // in the callback we set state of currentUser to that user state.
    //This also provides user authenticated session persistance. Firebase remembers the user even if we refresh our app or close the browser. User need not resign in if he does not sign out.

    //auth.onAuthStateChanged() is like an open subscription/open messaging system beween firebase and our app
    //when ever any change occur on firebase from any source related to this application, firebase sends out a message that the auth state is changed that the user state is updated and then it will call it following userState automatically.
    this.unsubscribeFromAuth = auth.onAuthStateChanged((userState) => {
      this.setState({ currentUser: userState });
      console.log(userState);
    });
  }

  // We need to close above subscription when component unmounts so that there is no memory leak in js apps
  // A Memory leak can be defined as a piece of memory that is no longer being used or required by an application but for some reason is not returned back to the OS and is still being occupied needlessly. ... A Javascript memory leak occurs when you may no longer need an object but the JS runtime still thinks you do.
  //we want to close the auth subscription when ever the component is unmount.

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  //this is how we handle our application being aware of any auth changes on Firebase.

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUp} />
      </div>
    );
  }
}

export default App;
