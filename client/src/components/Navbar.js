import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    console.log(this.props.auth);
    return (
      <div className="container navbars navbar">
        {!this.props.auth.isAuthenticated && (
          <div className="navbar-list flex-container">
            <div className="navbar-list-item">
              <Link to="/login">Login</Link>
            </div>
            <div className="navbar-list-item">
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
        )}
        {this.props.auth.isAuthenticated && (
          <div className="navbar-list flex-container">
            <div className="navbar-list-item">
              <Link to="/uploads">Uploads</Link>
            </div>
            <div className="navbar-list-item">
              <a
                href="/"
                onClick={() => {
                  console.log("kakakaka");
                  this.props.logoutUser();
                }}
              >
                Log Out
              </a>
            </div>
          </div>
        )}
        <div className="navbar-list flex-container" />
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
