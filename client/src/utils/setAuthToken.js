// Add bearer tokens to headers
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // If a token is provided, add it to the requests
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // If no token is provided, delete the header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
