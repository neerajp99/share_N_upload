// Import Redux, redux-thunk middleware
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Bring in root reducer
import rootReducer from "./reducers";

// Initialize the state as an empty object
const initialState = {};
const middleware = [thunk];

// Using redu dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Create store
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
