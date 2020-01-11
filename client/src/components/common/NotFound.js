import React from "react";
import {Link} from 'react-router-dom'
export default () => {
  return (
    <div className="container">
    <div className="not-found">
    <h1 className="display-6 not-found-h4">404 Page Not Found</h1>
    <h2 className="display-4 not-found-h5">Nothing to see here</h2>

    <Link to="/" className="no-hover">
    <button className="go-home-button">Go Home</button>
    </Link>
    </div>
    </div>
  );
};
