import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing'

function App() {
  return (

  <Router>  <div className="App">
      <Route exact path="/" render={() => <Landing />}/>
    </div></Router>
  );
}

export default App;
