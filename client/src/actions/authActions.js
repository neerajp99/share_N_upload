import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import axios from "axios";
// Bring in axios authentication header
import setAuthToken from "../utils/setAuthToken";
// Imoport jwt-decode to decode json web tokens
import jwtDecode from "jwt-decode";

// ***************** REGISTER USER *****************
export const registerUser = (data, history) => dispatch => {
  axios
    .post("/api/users/register", data)
    .then(res => {
      history.push("/");
      console.log("User Registered!");
    })
    .catch(error => {
      console.log("ERRORS", error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// ***************** LOGIN USER *****************
export const loginUser = (data, history) => dispatch => {
  axios
    .post("/api/users/login", data)
    .then(res => {
      // Payload token
      const { token } = res.data;
      // Saving the token data to localstorage
      localStorage.setItem("authToken", token);

      // Set authentication token to the axios header
      setAuthToken(token);
      // Decode the token to access user data
      const decodeToken = jwtDecode(token);
      // Set the current user as authenticated
      dispatch(setCurrentUser(decodeToken));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error !== undefined ? error.response.data: ""
      });
    });
};

// Set Auth Token function
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

// ***************** LOGOUT USER *****************
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("authToken");
  // Remove Auth headers from axios request
  setAuthToken(false);
  // Set current user to an empty object {} which will make isAuthenticated to false
  dispatch(setCurrentUser({}));
  // history.push("/login");
};
