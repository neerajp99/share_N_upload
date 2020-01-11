import React, { Component } from "react";
import TextField from "../common/TextField";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
// Bring in validation
import validateRegisterForm from "../../validation/registerForm";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
    nameError: null,
    emailError: null,
    passwordError: null,
    password2Error: null
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    const { isValid, errors } = validateRegisterForm(newUser);
    if (!isValid) {
      console.log(errors);
      this.setState({
        nameError: errors.name,
        emailError: errors.email,
        passwordError: errors.password,
        password2Error: errors.password2
      });
    } else {
      this.props.registerUser(newUser, this.props.history);
    }
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { nameError, emailError, passwordError, password2Error } = this.state;
    return (
      <div className="container">
        <div className="register container">
          <div className="row justify-content-center">
            <div className="col-8 center_text m-auto">
              <h1 className="register_heading display-5 text-center">
                {" "}
                Create Account
              </h1>
              <div className="register_form text-center">
                <form
                  noValidate
                  className="register_form"
                  onSubmit={this.onSubmit}
                >
                  <TextField
                    placeholder="ex: Tanuj Sood"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    label="Full Name"
                    error={nameError}
                  />
                  <TextField
                    placeholder="ex: tanuj.sood@gmail.com"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    label="Email Address"
                    error={emailError}
                  />
                  <TextField
                    placeholder="ex: password12345"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    label="Password"
                    error={passwordError}
                  />
                  <TextField
                    placeholder="ex: password12345"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    label="Confirm Password"
                    error={password2Error}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4 register_button"
                  />
                </form>
                <h5 className="text-muted text-center already_line ">
                  Already have an account?{" "}
                  <span>
                    <Link to="/login">Login here</Link>
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Add prop-types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Add mapStateToProps
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
