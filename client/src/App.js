import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import SharedContent from "./components/shared/SharedContent";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Check if the user is already present in localstorage
// if yes, then authenticate the user
if (localStorage.authToken) {
  // Set auth token header auth
  setAuthToken(localStorage.authToken);
  //Decode the tokens ang get user infe ormation
  const decodedToken = jwt_decode(localStorage.authToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedToken));
  //Check for expired tokens
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    // log out user
    store.dispatch(logoutUser());
    // Redirect to login
    window.alert("Session expired, please login again.");
    window.location.href = "/login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        {" "}
        <div className="App">
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/api/shared/:id" component={SharedContent} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
