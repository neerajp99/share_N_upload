import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import SharedContent from "./components/shared/SharedContent";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";

function App() {
  return (
    <Router>
      {" "}
      <div className="App">
        <Route exact path="/" render={() => <Landing />} />
        <Route exact path="/api/shared/:id" component={SharedContent} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
