import React from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { Route } from 'react-router-dom';

const Hats = (props) => {
  // console.log(props);
  return <h1>Hats Page</h1>;
};

function App() {
  return (
    <div>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop/hats' component={Hats} />
    </div>
  );
}

export default App;
