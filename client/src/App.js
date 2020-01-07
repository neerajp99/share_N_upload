import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import SharedContent from "./components/shared/SharedContent";

function App() {
  return (
    <Router>
      {" "}
      <div className="App">
        <Route exact path="/" render={() => <Landing />} />
        <Route exact path="/api/shared/:id" component={SharedContent} />
      </div>
    </Router>
  );
}

export default App;
